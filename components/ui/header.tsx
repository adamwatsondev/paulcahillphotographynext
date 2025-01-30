"use client";

import { useState } from "react";
import Link from "next/link";
import BasketDrawer from "./basket-drawer";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex w-full justify-between sm:px-32 h-28 items-center bg-white shadow-md relative">
      {/* Logo and Title */}
      <Link href="/" className="hidden lg:block items-start space-x-4">
        <div className="col-span-3 text-start flex flex-col text-black">
          <span className="text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl font-old-standard">
            Paul Cahill
          </span>
          <span className="text-xs sm:text-md xl:text-lg 2xl:text-xl font-old-standard">
            Brighton Based Photographer
          </span>
        </div>
      </Link>

      <div className="sm:hidden flex w-full justify-center items-center relative">
        <button
          onClick={toggleMenu}
          className="text-black bg-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Navigation Menu (mobile) */}
        <div
          className={`absolute top-full left-0 w-full z-10 overflow-hidden flex justify-center transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-[100px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-5"
          }`}
        >
          <nav className="flex items-center px-4 py-4 gap-3">
            <Link
              href="/"
              className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400"
            >
              About
            </Link>
            <Link
              href="/galleries"
              className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400"
            >
              Galleries
            </Link>
            <Link
              href="/contact"
              className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400"
            >
              Contact
            </Link>
            <span
              onClick={toggleDrawer}
              className="text-black font-old-standard hover:cursor-pointer hover:underline hover:underline-offset-4 font-bold hover:text-gray-400"
            >
              Basket
            </span>
          </nav>
        </div>
      </div>

      {/* Navigation Menu (desktop) */}
      <nav className="sm:flex items-end space-x-8 xl:space-x-16 hidden">
        <Link
          href="/"
          className="text-black hover:underline hover:underline-offset-4 font-old-standard font-bold hover:text-gray-400 text-2xl"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400 text-2xl"
        >
          About
        </Link>
        <Link
          href="/galleries"
          className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400 text-2xl"
        >
          Galleries
        </Link>
        <Link
          href="/contact"
          className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400 text-2xl"
        >
          Contact
        </Link>
        <span
          onClick={toggleDrawer}
          className="text-black font-old-standard hover:cursor-pointer hover:underline hover:underline-offset-4 font-bold hover:text-gray-400 text-2xl"
        >
          Basket
        </span>
      </nav>

      {/* Drawer */}
      <BasketDrawer isOpen={isDrawerOpen} onToggle={toggleDrawer} />
    </div>
  );
}
