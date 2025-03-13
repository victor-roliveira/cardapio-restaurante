"use client";
import MenuCategories from "@/components/other-components/menu-category";
import Navbar from "@/components/other-components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/lib/axios";
import { Produto } from "@/lib/types/produto";

import { useEffect, useState } from "react";

import Image from "next/image";
import iconCartAdd from "../assets/add-car.svg";

const Pizzas = () => {
  const [produtos, setProdutos] = useState<Produto[] | null>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/produtos");
        setProdutos(response.data);
      } catch {
        console.log("Error");
      }
    };

    fetchProdutos();
  }, []);

  const pizzas = produtos?.filter(
    (produto) => produto.categoria.nome === "Pizzas"
  );
  return (
    <>
      <Navbar />
      <div className="flex">
        <MenuCategories />
        <section className="bg-slate-950 w-full h-auto pb-10">
          <div className="p-10">
            <div className="flex justify-between">
              <h1 className="text-white text-3xl font-semibold">PIZZAS</h1>
              <Select>
                <SelectTrigger className="w-[250px] text-white border-2">
                  <SelectValue placeholder="Selecione uma categoria..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    <SelectItem value="Tradicionais">Tradicionais</SelectItem>
                    <SelectItem value="Especiais">Especiais</SelectItem>
                    <SelectItem value="Napolitana">Napolitana</SelectItem>
                    <SelectItem value="Doces">Doces</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-5 flex-wrap">
              {pizzas?.map((produto) => (
                <Card
                  key={produto.id}
                  className="w-[300px] h-[400px] border-none bg-transparent text-white shadow-none hover:scale-110 transition-all"
                >
                  <CardContent className="space-y-2 p-0 border-none pt-10">
                    <Image
                      src={produto.imagem}
                      alt={`${produto.nome}`}
                      width={400}
                      height={200}
                      className="w-[500px] h-[200px] object-cover rounded"
                    />
                    <h2 className="text-2xl font-bold">{produto.nome}</h2>
                    <p className="text-sm text-white/80">{produto.descricao}</p>
                    <p className="font-semibold">
                      {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <div className="pt-2">
                      <Button className="bg-transparent rounded-sm border-[1.5px] border-gray-300">
                        Adicionar
                        <Image
                          src={iconCartAdd}
                          alt="Ícone adiconar carrinho"
                          width={20}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pizzas;
