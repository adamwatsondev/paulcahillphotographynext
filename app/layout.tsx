import type { Metadata } from "next";
import { Geist, Geist_Mono, Old_Standard_TT } from "next/font/google";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oldStandardTT.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
