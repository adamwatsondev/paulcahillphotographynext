import type { Metadata } from "next";
import { Geist, Geist_Mono, Old_Standard_TT } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { BasketProvider } from "./context/basket-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oldStandardTT = Old_Standard_TT({
  variable: "--font-old-standard",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Paul Cahill Photography",
  description: "Developed by Adam Watson",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oldStandardTT.className} antialiased`}
      >
        <BasketProvider>
          <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md h-16">
            <Header />
          </div>
          {children}
          {/* Footer */}
          <div className="fixed bottom-0 left-0 w-full sm:h-12 h-10 bg-white shadow-md flex items-center justify-center">
            <Footer />
          </div>
        </BasketProvider>
      </body>
    </html>
  );
}
