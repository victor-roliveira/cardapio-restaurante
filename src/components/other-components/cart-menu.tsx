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

const CartMenu = () => {
  const cartItems = [
    { id: 1, name: "Hambúrguer Clássico", price: 25.99, image: pizza },
    { id: 2, name: "Pizza de Pepperoni", price: 39.9, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
    { id: 3, name: "Refrigerante 500ml", price: 6.5, image: pizza },
  ];

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
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-2 border-b">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={50}
                className="rounded"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{item.name}</p>
                <div className="flex justify-between">
                  <p className="text-gray-600 font-medium">
                    R$ {item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Image src={minusIcon} alt="Icone de menos" width={20} />
                    <p>Qtd: 1</p>
                    <Image src={plusIcon} alt="Icone de mais" width={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-10 bg-orange-500 hover:bg-orange-500/85">
          Enviar Pedido
          <Image src={checkIcon} alt="Ícone check" width={20} />
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
