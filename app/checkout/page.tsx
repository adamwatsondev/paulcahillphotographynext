"use client";

import { Button } from "@/components/ui/nav-button";
import Image from "next/image";
import Link from "next/link";
import { useBasket } from "../context/basket-context";

export default function Checkout() {
  const { items, total, clearBasket, removeItem } = useBasket();

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
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
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
          <div className="xl:col-span-1 items-center justify-center col-span-2 flex flex-col gap-4"></div>
        )}
      </div>
    </div>
  );
}
