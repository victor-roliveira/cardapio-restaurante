import Image from "next/image";
import logoRestaurante from "../../app/assets/logo-restaurante.png";
import pizza from "../../app/assets/pizza-image.png";
import massa from "../../app/assets/macarrao-bacon.jpg";
import drink from "../../app/assets/aperol-zcafe.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const SomeFoods = () => {
  return (
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
                        Ingredientes: massa fresca artesanal, molho pomodoro a
                        bolonhesa
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
                        Ingredientes: Aperol, Água com gás, Gelo e Rodelas de
                        laranja
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
  );
};

export default SomeFoods;
