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
import logoRestaurante from "../assets/logo-restaurante.png";
import pizza from "../assets/pizza-image.png";
import massa from "../assets/macarrao-bacon.jpg";
import drink from "../assets/aperol-zcafe.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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
        <section className="bg-slate-950 w-full">
          <div className="w-full h-[400px] bg-black text-white pt-10">
            <div className="flex flex-col items-center justify-center gap-5">
              <Image src={logoRestaurante} alt="Logo do restaurante" />
              <h2 className="text-2xl font-bold">
                Há mais de 10 anos oferecendo o melhor para você.
              </h2>
              <p className="text-sm text-white/75">
                Acesse mais dos nossos produtos através do menu ao lado.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-white text-center">
            <p className="text-white text-2xl font-semibold py-2">Pizzas</p>
            <div className="flex gap-4">
              <Carousel className="mx-15">
                <CarouselContent>
                  {Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <CarouselItem key={index} className="basis-1/3">
                        <Card className="w-[200px]">
                          <CardContent className="w-full flex flex-col justify-center p-0">
                            <Image
                              src={pizza}
                              alt={`Imagem pizza ${index + 1}`}
                              className="w-full rounded-t-lg"
                            />
                            <h2 className="p-1 text-lg font-semibold">
                              Pizza Peperoni
                            </h2>
                            <p className="text-sm p-1 text-gray-500">
                              Ingredientes: Mussarela, Molho pomodoro, Orégano,
                              Peperoni
                            </p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-black" />
                <CarouselNext className="text-black" />
              </Carousel>
            </div>
          </div>
          <div className="flex flex-col items-center text-white text-center">
            <p className="text-white text-2xl font-semibold py-2">Massas</p>
            <Carousel className="mx-15">
              <CarouselContent>
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                      <Card className="w-[200px]">
                        <CardContent className="w-full flex flex-col justify-center p-0">
                          <Image
                            src={massa}
                            alt={`Imagem pizza ${index + 1}`}
                            className="w-full rounded-t-lg"
                          />
                          <h2 className="p-1 text-lg font-semibold">
                            Macarrão Bolonhesa
                          </h2>
                          <p className="text-sm p-1 text-gray-500">
                            Ingredientes: massa fresca artesanal, molho pomodoro
                            a bolonhesa
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="text-black" />
              <CarouselNext className="text-black" />
            </Carousel>
          </div>
          <div className="flex flex-col items-center mb-10 text-white text-center">
            <p className="text-white text-2xl font-semibold py-2">Drinks</p>
            <Carousel className="mx-15">
              <CarouselContent>
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                      <Card className="w-[200px]">
                        <CardContent className="w-full flex flex-col justify-center p-0">
                          <Image
                            src={drink}
                            alt={`Imagem pizza ${index + 1}`}
                            className="w-full h-[200px] rounded-t-lg"
                          />
                          <h2 className="p-1 text-lg font-semibold">
                            Aperol Spritz
                          </h2>
                          <p className="text-sm p-1 text-gray-500">
                            Ingredientes: Aperol, Água com gás, Gelo e Rodelas de laranja
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="text-black" />
              <CarouselNext className="text-black" />
            </Carousel>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cardapio;
