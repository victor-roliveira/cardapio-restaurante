"use client";
import { ReactNode } from "react";
import { CartProvider } from "./cart-context";
import { SocketProvider } from "./socket-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SocketProvider>
      <CartProvider>{children}</CartProvider>
    </SocketProvider>
  );
}
