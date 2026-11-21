import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagicCursor from "@/components/MagicCursor";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Accurate Pest Control Services LLC",
  description:
    "Dubai Municipality approved pest control services across the UAE.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
      style={{ overflowX: "clip" }}
    >
      <body className="flex min-h-full flex-col" style={{ overflowX: "clip" }}>
        <MagicCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
