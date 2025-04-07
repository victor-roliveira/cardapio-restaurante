import { Drumstick } from "lucide-react";
import iconPizza from "../../app/assets/icon-pizza.svg";
import iconMassa from "../../app/assets/icon-massas.svg";
import iconPratos from "../../app/assets/icon-pratos.svg";
import iconSobremesa from "../../app/assets/icon-sobremesa.svg";
import iconDrinks from "../../app/assets/icon-drink.svg";

import Link from "next/link";
import Image from "next/image";

const MenuCategories = () => {
  return (
    <aside className="bg-black w-[100px] fixed h-full left-0 top-20">
      <div>
        <p className="text-base text-center text-white pt-2">Categorias</p>
        <div className="pt-5">
          <div className="border-b-2 border-t-2">
            <Link
              href="/entradas"
              className="flex flex-col items-center justify-center text-white h-[75px] w-full bg-orange-400 hover:bg-primary/90 transition-colors rounded-none"
            >
              <Drumstick />
              Entradas
            </Link>
          </div>
          <div className="border-b-2">
            <Link
              href="/pizzas"
              className="flex flex-col items-center justify-center text-white h-[75px] w-full bg-orange-400 hover:bg-primary/90 transition-colors rounded-none"
            >
              <Image src={iconPizza} alt="Ícone pizza" width={30} />
              Pizzas
            </Link>
          </div>
          <div className="border-b-2">
            <Link
              href="/massas"
              className="flex flex-col items-center justify-center text-white h-[75px] w-full bg-orange-400 hover:bg-primary/90 transition-colors rounded-none"
            >
              <Image src={iconMassa} alt="Ícone massas" width={30} />
              Massas
            </Link>
          </div>
          <div className="border-b-2">
            <Link
              href="/pratos"
              className="flex flex-col items-center justify-center text-white h-[75px] w-full bg-orange-400 hover:bg-primary/90 transition-colors rounded-none"
            >
              <Image src={iconPratos} alt="Ícone pratos" width={30} />
              Pratos
            </Link>
          </div>
          <div className="border-b-2">
            <Link
              href="/sobremesas"
              className="flex flex-col items-center justify-center text-white h-[75px] w-full bg-orange-400 hover:bg-primary/90 transition-colors rounded-none"
            >
              <Image src={iconSobremesa} alt="Ícone sobremesa" width={30} />
              Sobremesas
            </Link>
          </div>
          <div className="border-b-2">
            <Link
              href="/bebidas"
              className="flex flex-col items-center justify-center text-white h-[75px] w-full bg-orange-400 hover:bg-primary/90 transition-colors rounded-none"
            >
              <Image src={iconDrinks} alt="Ícone bebidas" width={30} />
              Bebidas
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MenuCategories;
