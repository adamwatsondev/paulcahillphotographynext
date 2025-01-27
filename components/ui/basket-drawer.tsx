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

interface BasketDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const BasketDrawer: React.FC<BasketDrawerProps> = ({ isOpen, onToggle }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onToggle}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-5xl font-bold font-old-standard text-black mb-8">
            Basket
          </DrawerTitle>
          <DrawerClose />
        </DrawerHeader>
        <DrawerDescription>{/* basket items go here */}</DrawerDescription>
        <DrawerFooter>
          <span className="text-xl font-bold text-end font-old-standard text-black mb-8">
            Total: £0.00
          </span>
          <div className="flex justify-between">
            <Button
              className="text-white h-12 w-40 font-bold py-2 px-4 rounded-sm"
              onClick={onToggle}
            >
              Close
            </Button>
            <Link href="/checkout">
              <Button
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
