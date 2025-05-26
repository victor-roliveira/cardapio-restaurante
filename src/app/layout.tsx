import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppProviders } from "@/contexts/app-providers";

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
      <AppProviders>
        <body className={`${kanit.className} antialiased`}>{children}</body>
        <Toaster />
      </AppProviders>
    </html>
  );
}
