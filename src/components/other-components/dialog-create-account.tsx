"use client";
import { UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Conta } from "@/lib/types/pedidos";
import { api } from "@/lib/axios";


const DialogCreateAccount = () => {
  const [name, setName] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  // Checa se já tem conta no localStorage ao montar o componente
  useEffect(() => {
    const existingAccount = localStorage.getItem("conta");
    if (existingAccount) {
      setHasAccount(true);
    }
  }, []);

  const handleCreateAccount = async () => {
    if (!name.trim()) {
      toast.error("Por favor, insira um nome.");
      return;
    }

    const newAccount: Conta = {
      donoConta: name,
      statusConta: "Aberta",
      pedidos: [],
    };

    try {
      const response = await api.post("/contas", newAccount);
      const savedAccount = {
        ...response.data,
        pedidos: response.data.pedidos || [],
      };

      localStorage.setItem("conta", JSON.stringify(savedAccount));
      setHasAccount(true); // ← isso aqui ativa a reatividade
      setName("");
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Ocorreu um erro ao criar a conta");
    }
  };

  const handleRemoveAccount = () => {
    localStorage.removeItem("conta");
    setHasAccount(false); // ← e isso reativa o botão
    toast.info("Conta removida.");
  };

  return (
    <Dialog>
      <div className="flex items-center gap-2">
        <DialogTrigger asChild>
          <Button
            className="bg-orange-500 border-2 border-orange-500"
            disabled={hasAccount}
          >
            Abrir Conta
            <UserRoundPlus className="ml-2" />
          </Button>
        </DialogTrigger>

        {hasAccount && (
          <Button className="bg-white text-black hover:bg-white/80" onClick={handleRemoveAccount}>
            Remover Conta
          </Button>
        )}
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Abrindo Conta</DialogTitle>
          <DialogDescription>
            Preencha o campo abaixo para abrir uma conta.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full space-y-1.5">
          <label htmlFor="name">Nome</label>
          <Input
            id="name"
            placeholder="Seu nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={hasAccount}
          />

          <Button
            onClick={handleCreateAccount}
            className="bg-orange-500 hover:bg-orange-500/80"
            disabled={hasAccount}
          >
            Abrir Conta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateAccount;