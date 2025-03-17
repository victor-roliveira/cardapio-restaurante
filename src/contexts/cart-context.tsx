"use client";
import { PedidoProduto } from "@/lib/types/pedidos";
import { Produto } from "@/lib/types/produto";
import { createContext, useContext, useState } from "react";

interface CartContextType {
  cart: PedidoProduto[];
  addToCart: (produto: Produto, quantidade?: number) => void;
  removeFromCart: (produtoId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<PedidoProduto[]>([]);

  const addToCart = (produto: Produto, quantidade = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.produtoId === produto.id
      );
      if (existingItem) {
        return prevCart.map((item) => {
          if (item.produtoId === produto.id) {
            return { ...item, quantidade: item.quantidade + quantidade };
          }
          return item;
        });
      }
      return [
        ...prevCart,
        {
          produtoId: produto.id,
          quantidade,
        } as PedidoProduto,
      ];
    });
  };

  const removeFromCart = (produtoId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.produtoId !== produtoId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
