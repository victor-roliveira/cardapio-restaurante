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
import { Conta, Mesa, Pedido } from "@/lib/types/pedidos";
import { toast } from "sonner";
import { useSocket } from "@/contexts/socket-provider";
import { api } from "@/lib/axios";

const PaymentMenu = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const socket = useSocket();

  // Função para buscar pedidos da conta
  const fetchPedidosPorConta = async (contaId: number | undefined) => {
    try {
      const response = await api(`/contas/${contaId}`);
      const pedidosConta: Pedido[] = response.data.pedidos || [];
      setPedidos(pedidosConta);
      calcularTotal(pedidosConta);
    } catch (error) {
      console.error("Erro ao buscar pedidos da conta:", error);
      toast.error("Erro ao carregar os pedidos da conta.");
    }
  };

  // Função para calcular o total da conta
  const calcularTotal = (pedidos: Pedido[]) => {
    const totalCalculado = pedidos.reduce((acc, pedido) => {
      const subtotal = pedido.produtos.reduce(
        (sum, produto) => sum + produto.produto.preco * produto.quantidade,
        0
      );
      return acc + subtotal;
    }, 0);
    setTotal(totalCalculado);
  };

  // Efeito para carregar os pedidos iniciais
  useEffect(() => {
    const storedConta = localStorage.getItem("conta");
    if (!storedConta) {
      toast.error("Conta não encontrada no armazenamento local.");
      return;
    }

    const conta: Conta = JSON.parse(storedConta);
    fetchPedidosPorConta(conta?.id);
  }, []);

  // Efeito para configurar os listeners do WebSocket
  useEffect(() => {
    if (!socket) return;

    const storedConta = localStorage.getItem("conta");
    if (!storedConta) return;

    const conta: Conta = JSON.parse(storedConta);

    // Listener para atualização de pedidos
    const handleAtualizacaoPedidos = (data: { contaId: number }) => {
      if (data.contaId === conta.id) {
        fetchPedidosPorConta(conta.id);
        toast.info("Novos pedidos foram adicionados à conta!");
      }
    };

    socket.on("atualizarPedidos", handleAtualizacaoPedidos);

    // Limpeza do listener quando o componente desmontar
    return () => {
      socket.off("atualizarPedidos", handleAtualizacaoPedidos);
    };
  }, [socket]);

  // Função para solicitar pagamento
  const requestPayment = async () => {
    setLoading(true);
    if (socket && !socket.connected) {
      toast.info("Reconectando ao servidor...");
      socket.connect();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    try {
      const storedMesa = localStorage.getItem("mesaSelecionada");
      const storedConta = localStorage.getItem("conta");

      // Verificação mais robusta dos dados
      if (!storedMesa || !storedConta) {
        toast.error("Dados da mesa/conta não encontrados!");
        return;
      }

      const mesa: Mesa = JSON.parse(storedMesa);
      const conta: Conta = JSON.parse(storedConta);

      // Verificação adicional dos IDs
      if (!mesa.id || !conta.id) {
        toast.error("IDs da mesa/conta inválidos!");
        return;
      }

      // Delay apenas para visualização - pode ser removido em produção
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (socket) {
        // Emitir evento de solicitação de conta
        socket.emit("solicitandoConta", {
          numeroMesa: mesa.numero,
          donoConta: conta.donoConta,
          totalConta: total,
        });

        toast.success("Conta solicitada com sucesso!", { duration: 2000 });

        // Fechar o sheet após 2 segundos
        setTimeout(() => setSheetOpen(false), 2000);
      } else {
        toast.error("Conexão com o servidor perdida!");
      }
    } catch (error) {
      console.error("Erro ao solicitar conta:", error);
      toast.error("Erro ao solicitar conta");
    } finally {
      setLoading(false);

      // Forçar atualização dos dados do localStorage
      window.dispatchEvent(new Event("storage"));
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
