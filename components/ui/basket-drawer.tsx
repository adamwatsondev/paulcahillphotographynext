"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-between items-end">
            <span className="text-5xl font-bold font-old-standard text-black mb-8">
              Basket
            </span>
          </DrawerTitle>
          <DrawerClose />
        </DrawerHeader>
        <DrawerDescription className="flex flex-col gap-4">
          {items.length === 0 ? (
            <span>Your basket is empty</span>
          ) : (
            <div className="max-h-[600px] overflow-y-auto">
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
                      <span className="text-sm font-medium text-end font-old-standard text-black">
                        {item.asset_folder
                          .replace(/-/g, " ")
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
          )}
        </DrawerDescription>
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
          <div className="flex justify-between">
            <Button
              className="text-white h-12 w-40 font-bold py-2 px-4 rounded-sm"
              onClick={onToggle}
            >
              Close
            </Button>
            <Link href="/checkout">
              <Button
                disabled={items.length === 0}
                className="text-black bg-white border border-black h-12 w-40 hover:bg-gray-300 font-bold py-2 px-4 rounded-sm"
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
