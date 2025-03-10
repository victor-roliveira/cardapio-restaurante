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
      <CarouselContent className="w-[900px]">
        {pizzas.slice(0, 5).map((produto) => (
          <CarouselItem key={produto.id} className="basis-auto">
            <Card className="w-[200px] h-[300px] flex flex-col">
              <CardContent className="w-full flex flex-col justify-between p-0 h-full">
                <div className="w-[200px] h-[150px]">
                  <Image
                    src={produto.imagem}
                    alt={`Imagem pizza ${produto.nome}`}
                    className="w-full h-full object-cover rounded-t-lg"
                    width={200}
                    height={200}
                  />
                </div>
                <h2 className="p-1 text-lg font-semibold text-center">
                  {produto.nome}
                </h2>
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-sm text-center text-gray-500">{produto.descricao}</p>
                </div>
                <p className="text-base p-1 font-bold text-center">
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
