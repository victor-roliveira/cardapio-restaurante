import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CirclePercent,
  Drumstick,
  Pizza,
  Shell,
  ShoppingBasket,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

const Cardapio = () => {
  return (
    <>
      <nav className="flex items-center justify-between h-[70px] max-h-[70px] bg-black text-white">
        <span className="bg-gray-800 ml-16 py-1 px-4 rounded-sm">MESA 1</span>
        <Input
          type="text"
          placeholder="Busque o produto..."
          className="w-[300px] border-2"
        />
        <div>
          <Button className="h-[70px] bg-orange-500 hover:bg-orange-500/85 rounded-none border-l border-r">
            Ofertas
            <CirclePercent />
          </Button>
          <Button className="h-[70px] bg-orange-500 hover:bg-orange-500/85 rounded-none shadow-none">
            Carrinho
            <ShoppingBasket />
          </Button>
        </div>
      </nav>

      <aside className="bg-black max-w-[200px] h-screen">
        <div>
          <p className="text-xl text-center text-white pt-2">Categorias</p>
          <div className="pt-5">
            <div className="border-b-2 border-t-2">
              <Button className="h-[50px] w-full bg-orange-400 rounded-none">
                Entradas
                <Drumstick />
              </Button>
            </div>
            <div className="border-b-2">
              <Button className="h-[50px] w-full bg-orange-400 rounded-none">
                Pizzas
                <Pizza />
              </Button>
            </div>
            <div className="border-b-2">
              <Button className="h-[50px] w-full bg-orange-400 rounded-none">
                Massas <Shell />
              </Button>
            </div>
            <div className="border-b-2">
              <Button className="h-[50px] w-full bg-orange-400 rounded-none">
                Pratos <UtensilsCrossed />
              </Button>
            </div>
            <div className="border-b-2">
              <Button className="h-[50px] w-full bg-orange-400 rounded-none">
                Bebidas
                <Wine />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Cardapio;
