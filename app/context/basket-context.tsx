"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface BasketItem {
  id: string;
  size: string;
  price: number;
  imageUrl: string;
  asset_folder: string;
  display_name: string;
}

interface BasketContextProps {
  items: BasketItem[];
  total: number;
  addItem: (item: BasketItem) => void;
  clearBasket: () => void;
  removeItem: (id: string) => void;
}

const BasketContext = createContext<BasketContextProps | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BasketItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("basketItems");
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(items));
  }, [items]);

  const addItem = (item: BasketItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const clearBasket = () => {
    setItems([]);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <BasketContext.Provider
      value={{ items, total, addItem, clearBasket, removeItem }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
