"use client";
import { api } from "@/lib/axios";
import { Pedido, PedidoProduto } from "@/lib/types/pedidos";
import { Produto } from "@/lib/types/produto";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { io } from "socket.io-client";

const socket = io("https://restaurante-api-wv3i.onrender.com", {
  transports: ["websocket", "polling"],
});

interface CartContextType {
  cart: PedidoProduto[];
  addToCart: (produto: Produto, quantidade?: number) => void;
  removeFromCart: (produtoId: number) => void;
  clearCart: () => void;
  getTotalValue: () => number;
  submitOrder: (mesaId: number, contaId?: number) => Promise<void>;
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
          produto,
        } as PedidoProduto,
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.produtoId === id);
      if (itemToRemove && itemToRemove.quantidade > 1) {
        return prevItems.map((item) => {
          if (item.produtoId === id) {
            return { ...item, quantidade: item.quantidade - 1 };
          }
          return item;
        });
      }
      return prevItems.filter((item) => item.produtoId !== id);
    });
  };

  const getTotalValue = () => {
    return cart.reduce((total, item) => {
      return total + item.produto.preco * item.quantidade;
    }, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const submitOrder = async (mesaId: number, contaId?: number) => {
    if (cart.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    const pedido: Pedido = {
      mesaId,
      status: "pendente",
      contaId,
      produtos: cart,
    };

    try {
      const response = await api.post("/pedidos", {
        ...pedido,
      });

      if (response.status != 201) {
        toast.error("Pedido não enviado.");
      }

      clearCart();
      toast.success("Pedido enviado com sucesso!");
      socket.emit("pedidoCriado", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar pedido");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalValue,
        submitOrder,
      }}
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
