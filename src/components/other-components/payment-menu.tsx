"use client";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";

import iconWallet from "@/app/assets/wallet.svg";
import { useEffect, useState } from "react";
import { Conta, Pedido } from "@/lib/types/pedidos";
import { toast } from "sonner";
import { useSocket } from "@/contexts/socket-provider";
import { api } from "@/lib/axios";

const PaymentMenu = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    const fetchPedidosPorConta = async () => {
      const storedConta = localStorage.getItem("conta");
      if (!storedConta) {
        toast.error("Conta não encontrada no armazenamento local.");
        return;
      }

      const conta: Conta = JSON.parse(storedConta);
      const contaId = conta.id;

      try {
        const response = await api(`/contas/${contaId}`);
        const pedidosConta: Pedido[] = response.data.pedidos || [];

        setPedidos(pedidosConta);

        const totalCalculado = pedidosConta.reduce((acc, pedido) => {
          const subtotal = pedido.produtos.reduce(
            (sum, produto) => sum + produto.produto.preco * produto.quantidade,
            0
          );
          return acc + subtotal;
        }, 0);

        setTotal(totalCalculado);
      } catch (error) {
        console.error("Erro ao buscar pedidos da conta:", error);
        toast.error("Erro ao carregar os pedidos da conta.");
      }
    };

    fetchPedidosPorConta();
  }, []);

  const requestPayment = async () => {
    setLoading(true);

    try {
      const storedMesa = localStorage.getItem("mesaSelecionada");
      if (!storedMesa) {
        toast.error("Erro ao recuperar a mesa!");
        return;
      }

      const mesa = JSON.parse(storedMesa);

      localStorage.setItem(
        "mesaSelecionada",
        JSON.stringify({ numero: mesa.numero })
      );

      await new Promise((resolve) => setTimeout(resolve, 400));

      if (socket) {
        socket.emit("solicitandoConta", { mesaId: mesa.numero, total });
        toast.success("Conta solicitada com sucesso!", { duration: 2000 });
        setTimeout(() => setSheetOpen(false), 5000);
      } else {
        toast.error("Erro ao conectar ao servidor!");
      }
    } catch (error) {
      console.error("Erro ao solicitar conta:", error);
      toast.error("Ocorreu um erro ao solicitar a conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          <Button className="h-[70px] bg-orange-500 rounded-none text-center break-words">
            <span className="block text-sm leading-tight">Conta</span>
            <Image src={iconWallet} alt="Ícone carteira" width={20} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center text-2xl font-bold">
            <p className="text-4xl">Conta Final</p>
          </SheetTitle>
          <SheetDescription className="text-md font-medium">
            Visualize o total do seu consumo
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4 flex-1 overflow-y-auto max-h-[470px] border-b-2">
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <div key={pedido.id} className="border-b pb-2 mb-2">
                <p className="font-semibold">Pedido #{pedido.id}</p>
                <ul className="pl-4 text-sm">
                  {pedido.produtos.map((produto, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {produto.produto.nome} x{produto.quantidade}
                      </span>
                      <span>R$ {produto.produto.preco.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum pedido encontrado.
            </p>
          )}
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t shadow-md">
          <div className="flex justify-between mb-3">
            <p className="text-2xl font-semibold">Total</p>
            <p className="text-2xl">R$ {total.toFixed(2)}</p>
          </div>
          <Button
            onClick={requestPayment}
            disabled={loading || pedidos.length === 0}
            className="w-full p-6 bg-orange-500 hover:bg-orange-500/85"
          >
            {loading ? (
              <div className="loader"></div>
            ) : (
              <div className="flex gap-3">
                <p className="text-2xl">Solicitar Conta</p>
              </div>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PaymentMenu;
