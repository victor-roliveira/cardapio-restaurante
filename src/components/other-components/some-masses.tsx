"use client";

import { api } from "@/lib/axios";
import { Produto } from "@/lib/types/produto";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import iconAddCard from "../../app/assets/add-car.svg";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { Button } from "../ui/button";

const SomeMasses = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { addToCart } = useCart();

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

  const massas = produtos.filter(
    (produto) => produto.categoria.nome === "Massas"
  );

  return (
    <Carousel className="mx-15">
      <CarouselContent className="w-[900px]">
        {massas.slice(0, 5).map((produto) => (
          <CarouselItem key={produto.id} className="basis-auto">
            <Card className="bg-transparent border-none text-white w-[200px] h-[300px] flex flex-col pb-2">
              <CardContent className="w-full flex flex-col items-center p-0 h-full">
                <div className="w-[200px] h-[150px]">
                  <Image
                    src={produto.imagem}
                    alt={`Imagem massa: ${produto.nome}`}
                    className="w-full h-full object-cover rounded-t-lg"
                    width={200}
                    height={200}
                  />
                </div>
                <h2 className="p-1 text-lg font-semibold text-center">
                  {produto.nome}
                </h2>
                <div className="flex-grow">
                  <p className="text-sm text-center text-gray-400 font-medium">
                    {produto.descricao}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <p className="text-base p-1 font-bold text-center">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                  <Button onClick={() => addToCart(produto)} className="bg-transparent">
                    <Image
                      src={iconAddCard}
                      alt="Adicionar ao carrinho"
                      width={20}
                      className="cursor-pointer"
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SomeMasses;
