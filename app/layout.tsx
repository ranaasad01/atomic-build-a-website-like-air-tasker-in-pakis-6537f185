import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaamKaro — Pakistan's Local Task Marketplace",
  description:
    "Post tasks, hire trusted local taskers across Pakistan. From cleaning to delivery, handyman to tutoring — KaamKaro connects you with skilled people in your city.",
  keywords: [
    "freelance Pakistan",
    "task marketplace",
    "hire local",
    "Karachi",
    "Lahore",
    "Islamabad",
    "KaamKaro",
  ],
  openGraph: {
    title: "KaamKaro — Pakistan's Local Task Marketplace",
    description:
      "Post tasks, hire trusted local taskers across Pakistan.",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="bg-white text-gray-900 antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}