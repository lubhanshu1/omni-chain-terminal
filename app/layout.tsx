import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationDock from "./components/NavigationDock";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omni-Chain Terminal",
  description: "Advanced Web3 Infrastructure Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The Global Navigation Dock floats on top of every page */}
        <NavigationDock />

        {/* This renders whatever page you are currently on */}
        {children}

        {/* This collects real-time visitor insights for your Vercel dashboard */}
        <Analytics />
      </body>
    </html>
  );
}