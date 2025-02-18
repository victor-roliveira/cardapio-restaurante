import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CirclePercent,
  Drumstick,
  Pizza,
  Search,
  Shell,
  ShoppingBasket,
  UtensilsCrossed,
  Wallet,
  Wine,
} from "lucide-react";
import Image from "next/image";
import imgOfertas from "../assets/imagem-ofertas.webp";

const Cardapio = () => {
  return (
    <>
      <nav className="flex items-center justify-between h-[70px] max-h-[70px] bg-black text-white">
        <span className="bg-gray-800 ml-16 py-1 px-4 rounded-sm">MESA 1</span>
        <div className="relative w-[250px]">
          <Input
            type="text"
            placeholder="Busque o produto..."
            className="w-full pl-10 border-2"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>

        <div>
          <Button className="h-[70px] bg-orange-500 rounded-none border-l border-r">
            Ofertas
            <CirclePercent />
          </Button>
          <Button className="h-[70px] bg-orange-500 rounded-none border-r">
            Carrinho
            <ShoppingBasket />
          </Button>
          <Button className="h-[70px] bg-orange-500 rounded-none">
            Conta
            <Wallet />
          </Button>
        </div>
      </nav>

      <div className="flex">
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
        <section className="bg-slate-900 w-full">
          <div>
            <Image
              src={imgOfertas}
              alt="Imagem das promocoes"
              className="w-full h-[400px] rounded-sm"
            />
          </div>
          <div className="flex flex-col items-center text-white text-center">
            <p className="text-white py-2">Massas</p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <Image
                  src={imgOfertas}
                  alt="Imagem das promocoes"
                  className="w-[250px] h-[200px] rounded-sm"
                />
                <div className="bg-black w-full">
                  <p>Promoção 1</p>
                </div>
              </div>
              <div className="flex flex-col">
                <Image
                  src={imgOfertas}
                  alt="Imagem das promocoes"
                  className="w-[250px] h-[200px] rounded-sm"
                />
                <div className="bg-black w-full">
                  <p>Promoção 2</p>
                </div>
              </div>
              <div className="flex flex-col">
                <Image
                  src={imgOfertas}
                  alt="Imagem das promocoes"
                  className="w-[250px] h-[200px] rounded-sm"
                />
                <div className="bg-black w-full">
                  <p>Promoção 3</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-10 text-white text-center">
            <p className="text-white py-2">Drinks</p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <Image
                  src={imgOfertas}
                  alt="Imagem das promocoes"
                  className="w-[250px] h-[200px] rounded-sm"
                />
                <div className="bg-black w-full">
                  <p>Promoção 1</p>
                </div>
              </div>
              <div className="flex flex-col">
                <Image
                  src={imgOfertas}
                  alt="Imagem das promocoes"
                  className="w-[250px] h-[200px] rounded-sm"
                />
                <div className="bg-black w-full">
                  <p>Promoção 2</p>
                </div>
              </div>
              <div className="flex flex-col">
                <Image
                  src={imgOfertas}
                  alt="Imagem das promocoes"
                  className="w-[250px] h-[200px] rounded-sm"
                />
                <div className="bg-black w-full">
                  <p>Promoção 3</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cardapio;
