"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./button";
import Link from "next/link";
import { useBasket } from "@/app/context/basket-context";
import Image from "next/image";
interface BasketDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const BasketDrawer: React.FC<BasketDrawerProps> = ({ isOpen, onToggle }) => {
  const { items, total, clearBasket, removeItem } = useBasket();

  return (
    <Drawer open={isOpen} onOpenChange={onToggle}>
      <DrawerContent className="w-80 px-4 sm:w-96">
        <DrawerHeader>
          <DrawerTitle>
            <span className="text-5xl font-bold font-old-standard text-black mb-8">
              Basket
            </span>
          </DrawerTitle>
          <DrawerClose />
        </DrawerHeader>
        {items.length === 0 ? (
          <span>Your basket is empty</span>
        ) : (
          <div className="min-h-[100px] p-2 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex gap-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.id}
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col justify-center items-start">
                    <span className="text-sm font-medium text-start line-clamp-1 font-old-standard text-black">
                      {item.asset_folder.replace(/-/g, " ").replace("and", "&")}
                    </span>
                    <span className="text-sm font-medium text-start font-old-standard text-black">
                      {item.display_name}
                    </span>
                    <span className="text-sm font-medium text-start font-old-standard text-black">
                      {item.size}
                    </span>
                    <span className="text-sm font-bold text-start font-old-standard text-black">
                      £{item.price}
                    </span>
                  </div>
                </div>
                <Button
                  className="text-white bg-destructive h-8 w-16 font-bold mr-4 py-2 px-4 rounded-sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        <DrawerFooter className="flex flex-col gap-4">
          <span className="text-xl font-bold text-start font-old-standard text-black">
            Total: £{total}
          </span>
          <Button
            disabled={items.length === 0}
            className="text-white bg-destructive h-12 w-full font-bold py-2 px-4 rounded-sm"
            onClick={clearBasket}
          >
            Clear Basket
          </Button>
          <div className="flex gap-2">
            <Button
              className="text-white h-12 w-1/2 font-bold py-2 px-4 rounded-sm"
              onClick={onToggle}
            >
              Close
            </Button>
            <Link href="/checkout" className="w-1/2">
              <Button
                disabled={items.length === 0}
                className="text-black bg-white border border-black h-12 w-full hover:bg-gray-300 font-bold py-2 px-4 rounded-sm"
                onClick={onToggle}
              >
                Checkout
              </Button>
            </Link>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BasketDrawer;
