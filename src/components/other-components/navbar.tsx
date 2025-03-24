"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoHome from "@/app/assets/icon-home.svg";
import bellIcon from "@/app/assets/bell-icon.svg";
import iconWallet from "@/app/assets/wallet.svg";
import CartMenu from "../other-components/cart-menu";
import { api } from "@/lib/axios";
import { Produto } from "@/lib/types/produto";
import iconCart from "../../app/assets/car.svg";
import { useCart } from "@/contexts/cart-context";

const Navbar = () => {
  const [numeroMesa, setNumeroMesa] = useState<number | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const mesaSelecionada = localStorage.getItem("mesaSelecionada");
    if (mesaSelecionada) {
      const mesa = JSON.parse(mesaSelecionada);
      setNumeroMesa(mesa.numero);
    }
  }, []);

  useEffect(() => {
    if (busca.length < 2) {
      setProdutos([]);
      return;
    }

    const fetchProdutos = async () => {
      setLoading(true);
      try {
        const response = await api.get("/produtos");
        // Filtra os produtos no frontend
        const produtosFiltrados = response.data.filter((produto: Produto) =>
          produto.nome.toLowerCase().includes(busca.toLowerCase())
        );
        setProdutos(produtosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProdutos();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [busca]);

  return (
    <nav className="flex items-center justify-between h-[70px] bg-black text-white">
      <div className="flex items-center gap-4">
        <span className="bg-gray-800 ml-16 py-1 px-4 rounded-sm">
          {numeroMesa ? `MESA ${numeroMesa}` : "Selecione uma mesa"}
        </span>
        <Link href="/cardapio">
          <Image src={logoHome} alt="logo home" width={30} />
        </Link>
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogTrigger asChild>
          <div className="border-b p-1">
            <div className="relative w-[250px]">
              <Input
                type="text"
                placeholder="Busque o produto..."
                className="w-full pl-10 border-none shadow-none cursor-pointer"
                onClick={() => setModalAberto(true)}
                readOnly
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[800px] h-[500px] p-5 bg-black shadow-md shadow-white/10 text-white rounded-md text-center border-none flex flex-col">
          <div className="mb-3">
            <DialogHeader>
              <DialogTitle className="text-3xl">Busque um produto</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              placeholder="Digite o nome do produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-2 border-none rounded-md mt-2"
            />
            <div className="border-t-2 mt-2"></div>
          </div>

          {loading && (
            <p className="text-gray-500 text-sm mt-2">Carregando...</p>
          )}

          <div className="mt-3 max-h-[300px] overflow-auto">
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <ul
                  key={produto.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <li className="p-2">
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      width={80}
                      height={80}
                    />
                  </li>
                  <li className="p-2 text-xl">{produto.nome}</li>
                  <li className="p-2">
                    {produto.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </li>
                  <li className="p-2">
                    <Button
                      onClick={() => addToCart(produto)}
                      className="bg-transparent hover:bg-transparent hover:scale-125 transition-all shadow-none"
                    >
                      <Image src={iconCart} alt="Ícone carrinho" width={30} />
                    </Button>
                  </li>
                </ul>
              ))
            ) : (
              <p className="text-gray-500 text-sm mt-2">
                Busque...
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center relative">
        <Button className="h-[70px] bg-orange-500 rounded-none border-l border-r text-center break-words">
          <span>
            Chamar
            <br />
            Garçom
          </span>
          <Image src={bellIcon} alt="Ícone chamar garçom" width={20} />
        </Button>
        <CartMenu />
        <Button className="h-[70px] bg-orange-500 rounded-none text-center break-words">
          <span className="block text-sm leading-tight">Conta</span>
          <Image src={iconWallet} alt="Ícone carteira" width={20} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
