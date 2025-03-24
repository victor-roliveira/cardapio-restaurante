import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/sonner";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Cardápio Digital",
  description: "Selecione os produtos da sua escolha...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={`${kanit.className} antialiased`}>{children}</body>
        <Toaster />
      </CartProvider>
    </html>
  );
}
