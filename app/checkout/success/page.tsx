"use client";

import { useEffect } from "react";
import { useBasket } from "@/app/context/basket-context";

export default function CheckoutSuccess() {
  const { clearBasket } = useBasket();

  useEffect(() => {
    clearBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20 mt-28 sm:mt-40">
      <span className="text-5xl capitalize font-bold text-center font-old-standard text-black">
        Checkout Successful
      </span>
      <div className="grid grid-cols-1 gap-12 2xl:gap-20 items-center justify-center mx-4 xl:mx-40 sm:mx-20">
        <div className="col-span-1 flex flex-col text-center items-center justify-center gap-4">
          <span className="text-black font-old-standard md:text-2xl text-xl font-medium leading-tight">
            Your order has been placed.
          </span>
          <span className="text-black font-old-standard md:text-2xl text-xl font-medium leading-tight">
            You will receive an email confirmation shortly.
          </span>
        </div>
      </div>
    </div>
  );
}
