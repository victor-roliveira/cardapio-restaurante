"use client";
import MenuCategories from "@/components/other-components/menu-category";
import Navbar from "@/components/other-components/navbar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import iconCartAdd from "../assets/add-car.svg";

import { useEffect, useState } from "react";
import { Produto } from "@/lib/types/produto";
import { api } from "@/lib/axios";
import { useCart } from "@/contexts/cart-context";

const Entries = () => {
  const [produtos, setProdutos] = useState<Produto[] | null>([]);
  const {addToCart} = useCart();

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

  const entradas = produtos?.filter(
    (produto) => produto.categoria.nome === "Entradas"
  );
  return (
    <>
      <Navbar />
      <div className="flex">
        <MenuCategories />
        <section className="bg-slate-950 w-full h-auto pb-10 pl-[100px]">
          <div className="py-10 px-[120px]">
            <h1 className="text-white text-3xl font-semibold">ENTRADAS</h1>
            <div className="flex gap-5 flex-wrap">
              {entradas?.map((produto) => (
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
                      <Button onClick={() => addToCart(produto)} className="bg-transparent rounded-sm border-[1.5px] border-gray-300">
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

export default Entries;
