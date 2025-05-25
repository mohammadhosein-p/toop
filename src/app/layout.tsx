import type { Metadata } from "next";
// import { Barlow, Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// const barlow = Barlow({
//   weight: "600",
//   variable: "--font-barlow",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Toop",
  description: "football information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
