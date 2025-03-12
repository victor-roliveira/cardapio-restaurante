"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/other-components/navbar";
import MenuCategories from "@/components/other-components/menu-category";
import iconCartAdd from "../assets/add-car.svg";
import { Produto } from "@/lib/types/produto";
import { api } from "@/lib/axios";

const Desserts = () => {
  const [produtos, setProdutos] = useState<Produto[] | null>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

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

  const sobremesas = produtos?.filter(
    (produto) => produto.categoria.nome === "Sobremesas"
  );

  // Alterna entre descrição curta e completa
  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <MenuCategories />
        <section className="bg-slate-950 w-full h-auto pb-10">
          <div className="pt-10 pl-10">
            <h1 className="text-white text-3xl font-semibold">SOBREMESAS</h1>

            <div className="flex gap-5 flex-wrap">
              {sobremesas?.map((produto) => {
                const isExpanded = expanded[produto.id] || false;
                const descricaoCurta =
                  produto.descricao.length > 100
                    ? `${produto.descricao.slice(0, 80)}...`
                    : produto.descricao;

                return (
                  <Card
                    key={produto.id}
                    className="w-[300px] h-[500px] border-none bg-transparent text-white shadow-none hover:scale-110 transition-all"
                  >
                    <CardContent className="flex flex-col space-y-2 p-0 border-none pt-10 h-full">
                      <Image
                        src={produto.imagem}
                        alt={`${produto.nome}`}
                        width={400}
                        height={200}
                        className="w-[500px] h-[200px] object-cover rounded"
                      />
                      <h2 className="text-2xl font-bold">{produto.nome}</h2>
                      <div>
                        <p
                          className="text-sm text-white/80 cursor-pointer pr-2"
                          onClick={() => toggleExpand(produto.id.toString())}
                        >
                          {isExpanded ? produto.descricao : descricaoCurta}{" "}
                          {produto.descricao.length > 100 && (
                            <span className="text-blue-400 underline">
                              {isExpanded ? "Ver menos" : "Ver mais"}
                            </span>
                          )}
                        </p>
                      </div>
                      <p className="font-semibold select-none">
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
                            alt="Ícone adicionar carrinho"
                            width={20}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Desserts;
