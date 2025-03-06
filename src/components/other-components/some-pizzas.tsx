"use client";

import { api } from "@/lib/axios";
import { Produto } from "@/lib/types/produto";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const SomePizzas = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/produtos");
        setProdutos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const pizzas = produtos.filter(
    (produto) => produto.categoria.nome === "Pizzas"
  );

  return (
    <Carousel className="mx-15">
      <CarouselContent>
        {pizzas.map((produto) => (
          <CarouselItem key={produto.id} className="basis-1/3">
            <Card className="w-[200px]">
              <CardContent className="w-full flex flex-col justify-center p-0">
                <div className="w-[200px] h-[150px]">
                  <Image
                    src={produto.imagem}
                    alt={`Imagem pizza ${produto.nome}`}
                    className="w-full h-full object-cover rounded-t-lg"
                    width={200}
                    height={200}
                  />
                </div>
                <h2 className="p-1 text-lg font-semibold">{produto.nome}</h2>
                <p className="text-sm p-1 text-gray-500 font-bold">
                  R$ {produto.preco.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-black" />
      <CarouselNext className="text-black" />
    </Carousel>
  );
};

export default SomePizzas;
