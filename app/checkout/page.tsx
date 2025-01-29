"use client";

import { useBasket } from "../context/basket-context";
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  "enable-funding": "venmo",
  "disable-funding": "",
  "buyer-country": "GB",
  currency: "GBP",
  "data-page-type": "product-details",
  components: "buttons",
  "data-sdk-integration-source": "developer-studio",
};

function Message({ content }: { content: string }) {
  return <p>{content}</p>;
}

export default function Checkout() {
  const { items, total, clearBasket, removeItem } = useBasket();
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20 mt-40">
      <span className="text-5xl capitalize font-bold text-center font-old-standard text-black">
        Checkout
      </span>
      <div className="grid grid-cols-2 gap-12 2xl:gap-20 items-center justify-center mx-4 xl:mx-40 sm:mx-20">
        <div className="xl:col-span-1 col-span-2 flex flex-col gap-8">
          {items.length === 0 ? (
            <>
              <span className="text-black font-old-standard md:text-5xl text-2xl font-bold leading-tight">
                Your basket is empty
              </span>
              <span className="text-black font-old-standard md:text-2xl text-xl font-medium leading-tight">
                You can purchase images from galleries.
              </span>
              <Link href="/galleries">
                <div className="text-white h-12 w-40 font-bold py-2 px-4 rounded-sm bg-black flex items-center justify-center">
                  <span className="font-old-standard text-xl font-semibold">
                    Galleries
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.id}
                        width={150}
                        height={150}
                      />
                      <div className="flex flex-col justify-center items-start">
                        <span className="text-sm font-medium text-end font-old-standard text-black">
                          {item.asset_folder
                            .replace(/-/g, " ")
                            .replace("and", "&")
                            .replace("and", "&")}{" "}
                          - {item.display_name}
                        </span>
                        <span className="text-sm font-medium text-end font-old-standard text-black">
                          Size: {item.size}
                        </span>
                        <span className="text-sm font-bold text-end font-old-standard text-black">
                          Cost: £{item.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="text-white bg-destructive h-8 w-16 font-bold mr-4 py-2 px-4 rounded-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-xl font-bold text-end font-old-standard text-black">
                Total: £{total}
              </span>
              <Button
                className="text-white bg-destructive h-12 w-full font-bold py-2 px-4 rounded-sm"
                onClick={clearBasket}
              >
                Clear Basket
              </Button>
            </>
          )}
        </div>
        {items.length > 0 && (
          <div className="xl:col-span-1 col-span-2 flex flex-col gap-4">
            <div className="App">
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  disabled={true}
                  style={{
                    shape: "rect",
                    layout: "vertical",
                    color: "gold",
                    label: "paypal",
                  }}
                  createOrder={async () => {
                    try {
                      const response = await fetch("/api/orders", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          cart: items,
                        }),
                      });

                      const orderData = await response.json();

                      if (orderData.id) {
                        return orderData.id;
                      } else {
                        const errorDetail = orderData?.details?.[0];
                        const errorMessage = errorDetail
                          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                          : JSON.stringify(orderData);

                        throw new Error(errorMessage);
                      }
                    } catch (error) {
                      console.error(error);
                      setMessage(
                        `Could not initiate PayPal Checkout...${error}`
                      );
                    }
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      const response = await fetch(
                        `/api/orders/${data.orderID}/capture`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );

                      const orderData = await response.json();
                      const errorDetail = orderData?.details?.[0];

                      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                        return actions.restart();
                      } else if (errorDetail) {
                        throw new Error(
                          `${errorDetail.description} (${orderData.debug_id})`
                        );
                      } else {
                        const transaction =
                          orderData.purchase_units[0].payments.captures[0];
                        setMessage(
                          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                        );
                        console.log(
                          "Capture result",
                          orderData,
                          JSON.stringify(orderData, null, 2)
                        );
                      }
                    } catch (error) {
                      console.error(error);
                      setMessage(
                        `Sorry, your transaction could not be processed...${error}`
                      );
                    }
                  }}
                />
              </PayPalScriptProvider>
              <Message content={message} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
