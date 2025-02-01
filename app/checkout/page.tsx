"use client";

import { Button } from "@/components/ui/nav-button";
import Image from "next/image";
import Link from "next/link";
import { useBasket } from "../context/basket-context";
import { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Skeleton } from "@/components/ui/skeleton";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

console.log(stripePromise);

export default function Checkout() {
  const { items, total, clearBasket, removeItem } = useBasket();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      setLoading(true);
    }
  }, [items]);

  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line_items: items.map((item) => ({
          price: item.price,
          quantity: 1,
          name:
            item.asset_folder +
            " " +
            "-" +
            " " +
            item.display_name +
            " " +
            "-" +
            " " +
            item.size,
        })),
        total: total,
      }),
    });

    if (!response.ok) {
      console.error(
        "Failed to create checkout session:",
        await response.text()
      );
      return null;
    }

    const data = await response.json();
    return data.clientSecret;
  }, [items, total]);

  const options = { fetchClientSecret };

  if (loading) {
    return (
      <div className="flex flex-col gap-8 md:gap-20 pb-20 mt-28 sm:mt-40">
        <div className="flex justify-center items-center">
          <Skeleton className="h-12 w-1/2 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-12 2xl:gap-20 items-start justify-start mx-4 xl:mx-40 sm:mx-20">
          <div className="xl:col-span-1 col-span-2 flex flex-col gap-12">
            <div className="max-h-[400px] flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <Skeleton className="h-[100px] w-[150px] rounded-none bg-gray-300 object-fill" />
                </div>

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-[100px] bg-gray-300 rounded" />
                  <Skeleton className="h-4 w-[100px] bg-gray-300 rounded" />
                  <Skeleton className="h-4 w-[100px] bg-gray-300 rounded" />
                  <Skeleton className="h-4 w-[100px] bg-gray-300 rounded" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end gap-4">
              <Skeleton className="h-8 w-1/4 bg-gray-300 rounded" />
              <Skeleton className="h-8 w-full bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20 mt-40">
      <span className="text-5xl capitalize font-bold text-center font-old-standard text-black">
        Checkout
      </span>
      <div className="grid grid-cols-2 gap-12 2xl:gap-20 items-start justify-start mx-4 xl:mx-40 sm:mx-20">
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
                        <span className="text-sm font-medium text-start line-clamp-1 font-old-standard text-black">
                          {item.asset_folder
                            .replace(/-/g, " ")
                            .replace("and", "&")}
                        </span>
                        <span className="text-sm font-medium text-start font-old-standard text-black">
                          {item.display_name}
                        </span>
                        <span className="text-sm font-medium text-end font-old-standard text-black">
                          Size: {item.size}
                        </span>
                        <span className="text-sm font-bold text-end font-old-standard text-black">
                          Cost: £{item.price}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="text-white bg-destructive h-8 w-16 font-bold mr-4 py-2 px-4 rounded-sm"
                      onClick={() => {
                        removeItem(item.id);
                        window.location.reload();
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <span className="text-xl font-bold text-end font-old-standard text-black">
                Total: £{total}
              </span>
              <Button onClick={clearBasket}>Clear Basket</Button>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-old-standard text-left italic font-medium leading-tight text-black">
                  All prices are for prints only.
                </span>
                <span className="text-sm font-old-standard text-left italic font-medium leading-tight text-black">
                  All orders are printed on hahnemühle fine art photography
                  paper.
                </span>{" "}
                <span className="text-sm font-old-standard text-left italic font-medium leading-tight text-black">
                  If you are interested in mounted or framed images, please{" "}
                  <Link
                    className="underline hover:cursor-pointer"
                    href="/contact"
                  >
                    contact me for a quote
                  </Link>
                  .
                </span>
              </div>
            </>
          )}
        </div>
        {items.length > 0 && (
          <div
            id="checkout"
            className="col-span-2 xl:col-span-1 flex flex-col gap-4"
          >
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>
    </div>
  );
}
