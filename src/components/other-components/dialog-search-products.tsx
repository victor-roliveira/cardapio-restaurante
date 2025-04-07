import { Search } from "lucide-react";
import iconCart from "../../app/assets/car.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Produto } from "@/lib/types/produto";
import { useCart } from "@/contexts/cart-context";
import { api } from "@/lib/axios";

const DialogSearchProducts = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

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

        {loading && <p className="text-gray-500 text-sm mt-2">Carregando...</p>}

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
              Nenhum produto encontrado
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSearchProducts;