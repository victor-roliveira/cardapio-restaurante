import { Drumstick, Pizza, Shell, UtensilsCrossed, Wine } from "lucide-react";
import { Button } from "../ui/button";

const MenuCategories = () => {
  return (
    <aside className="bg-black max-w-[100px]">
      <div>
        <p className="text-base text-center text-white pt-2">Categorias</p>
        <div className="pt-5">
          <div className="border-b-2 border-t-2">
            <Button className="flex flex-col h-[100px] w-full bg-orange-400 rounded-none">
              <Drumstick />
              Entradas
            </Button>
          </div>
          <div className="border-b-2">
            <Button className="flex flex-col h-[100px] w-full bg-orange-400 rounded-none">
              <Pizza />
              Pizzas
            </Button>
          </div>
          <div className="border-b-2">
            <Button className="flex flex-col h-[100px] w-full bg-orange-400 rounded-none">
              <Shell />
              Massas
            </Button>
          </div>
          <div className="border-b-2">
            <Button className="flex flex-col h-[100px] w-full bg-orange-400 rounded-none">
              <UtensilsCrossed />
              Pratos
            </Button>
          </div>
          <div className="border-b-2">
            <Button className="flex flex-col h-[100px] w-full bg-orange-400 rounded-none">
              <Wine />
              Bebidas
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MenuCategories;