"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

      {/* Hamburger Icon for mobile */}
      <div className="sm:hidden flex w-full justify-center items-center relative">
        <button
          onClick={toggleMenu}
          className="text-black bg-white focus:outline-none"
        >
          {isMenuOpen ? (
            // Close Icon
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
            // Hamburger Icon
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md z-10">
            <nav className="flex justify-between items-center px-20 py-2">
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
                href="/contact?tab=general"
                className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Navigation Menu (desktop) */}
      <nav className="sm:flex items-center space-x-16 hidden">
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
          href="/contact?tab=general"
          className="text-black font-old-standard hover:underline hover:underline-offset-4 font-bold hover:text-gray-400 text-2xl"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
