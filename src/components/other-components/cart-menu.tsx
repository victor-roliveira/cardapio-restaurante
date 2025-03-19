"use client";
import Image from "next/image";
import iconCart from "../../app/assets/car.svg";
import checkIcon from "../../app/assets/check-icon.svg";
import plusIcon from "../../app/assets/plus-icon.svg";
import minusIcon from "../../app/assets/minus-icon.svg";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { useCart } from "@/contexts/cart-context";
import { Minus, Plus } from "lucide-react";

const CartMenu = () => {
  const { cart, addToCart, removeFromCart, clearCart, getTotalValue } =
    useCart();
  const hasItems = cart.length > 0;

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <Button className="h-[70px] bg-orange-500 rounded-none border-r">
            Carrinho
            <Image src={iconCart} alt="Ícone carrinho" width={20} />
            {hasItems && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse" />
            )}
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex gap-2 items-center text-2xl font-bold">
            <p className="text-4xl">Pedidos</p>
            <div className="bg-black py-1 px-3 text-white rounded-full">
              <p className="text-base">{totalItems}</p>
            </div>
          </SheetTitle>
          <SheetDescription className="text-md font-medium">
            Visualize seus pedidos aqui
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4 max-h-[470px] border-b-2 overflow-y-scroll">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-2 border-b">
              <Image
                src={item.produto.imagem}
                alt={item.produto.nome}
                width={80}
                height={50}
                className="rounded"
              />
              <div className="flex-1">
                <p className="text-2xl font-semibold">{item.produto.nome}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-600 font-medium text-lg">
                    R$ {item.produto.preco.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 p-1 border-2 rounded-full">
                    <Button
                      onClick={() => removeFromCart(item.produtoId)}
                      className="bg-transparent shadow-none hover:bg-transparent hover:scale-110 transition-all"
                    >
                      <Minus color="black" />
                    </Button>
                    <p>Qtd: {item.quantidade}</p>
                    <Button
                      onClick={() => addToCart(item.produto)}
                      className="bg-transparent shadow-none hover:bg-transparent hover:scale-110 transition-all"
                    >
                      <Plus color="black" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <p className="text-2xl font-semibold">Total</p>
          <p className="text-2xl">R$ {getTotalValue().toFixed(2)}</p>
        </div>

        <Button className="w-full p-6 mt-3 bg-orange-500 hover:bg-orange-500/85">
          <p className="text-2xl">Enviar Pedido</p>
          <Image src={checkIcon} alt="Ícone check" width={25} />
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
