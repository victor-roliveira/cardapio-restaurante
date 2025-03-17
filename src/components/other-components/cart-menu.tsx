"use client";
import Image from "next/image";
import iconCart from "../../app/assets/car.svg";
import checkIcon from "../../app/assets/check-icon.svg";
import plusIcon from "../../app/assets/plus-icon.svg";
import minusIcon from "../../app/assets/minus-icon.svg";
import pizza from "../../app/assets/pizza-image.png";
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

const CartMenu = () => {
  const { cart, addToCart, removeFromCart, clearCart, getTotalValue } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-[70px] bg-orange-500 rounded-none">
          Carrinho
          <Image src={iconCart} alt="Ícone carrinho" width={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Seus Pedidos</SheetTitle>
          <SheetDescription className="text-md font-medium">
            Visualize seus pedidos aqui
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4 max-h-[500px] overflow-y-scroll">
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
                <p className="text-lg font-semibold">{item.produto.nome}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-600 font-medium">
                    R$ {item.produto.preco.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => removeFromCart(item.produtoId)}
                      className="bg-transparent shadow-none hover:bg-transparent hover:scale-110 transition-all"
                    >
                      <Image src={minusIcon} alt="Icone de menos" width={20} />
                    </Button>
                    <p>Qtd: {item.quantidade}</p>
                    <Button
                      onClick={() => addToCart(item.produto)}
                      className="bg-transparent shadow-none hover:bg-transparent hover:scale-110 transition-all"
                    >
                      <Image src={plusIcon} alt="Icone de mais" width={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-lg font-semibold">
          Total: R$ {getTotalValue().toFixed(2)}
        </p>
        <Button className="w-full mt-7 bg-orange-500 hover:bg-orange-500/85">
          Enviar Pedido
          <Image src={checkIcon} alt="Ícone check" width={20} />
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
