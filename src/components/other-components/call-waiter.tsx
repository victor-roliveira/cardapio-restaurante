import { useSocket } from "@/contexts/socket-provider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";
import bellIcon from "@/app/assets/bell-icon.svg";

const CallWaiter = () => {
  const [numeroMesa, setNumeroMesa] = useState<number | null>(null);
  const socket = useSocket();

  useEffect(() => {
    const mesaSelecionada = localStorage.getItem("mesaSelecionada");
    if (mesaSelecionada) {
      const mesa = JSON.parse(mesaSelecionada);
      setNumeroMesa(mesa.numero);
    }
  }, []);
  const callWaiter = () => {
    if (!numeroMesa) {
      toast.error("Por favor, selecione uma mesa primeiro");
      return;
    }

    if (!socket) {
      toast.error("Conexão não estabelecida. Tente novamente.");
      return;
    }

    try {
      socket.emit("chamarGarcom", numeroMesa);
      toast.success(`Garçom chamado para a mesa ${numeroMesa}!`);
    } catch (error) {
      console.error("Erro ao chamar garçom:", error);
      toast.error("Erro ao chamar garçom. Tente novamente.");
    }
  };

  return (
    <Button
      onClick={callWaiter}
      className="h-[70px] bg-orange-500 rounded-none border-l border-r text-center break-words"
    >
      <span>
        Chamar
        <br />
        Garçom
      </span>
      <Image src={bellIcon} alt="Ícone chamar garçom" width={20} />
    </Button>
  );
};

export default CallWaiter;