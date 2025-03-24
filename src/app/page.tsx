"use client";
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
import { Mesa } from "@/lib/types/pedidos";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchMesas() {
      try {
        const response = await api.get("/mesas");
        setMesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar mesas:", error);
      }
    }

    fetchMesas();
  }, []);

  function handleConfirmar() {
    if (mesaSelecionada) {
      localStorage.setItem("mesaSelecionada", JSON.stringify(mesaSelecionada));
      router.push("/cardapio");
    } else {
      alert("Selecione uma mesa antes de confirmar!");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-5 bg-orange-500 w-[400px] p-10 rounded-md text-white">
        <h1 className="text-4xl">Cardápio Digital</h1>
        <p className="text-xl text-white/80">Escolha a mesa</p>

        <Select
          onValueChange={(value) => {
            const mesa = mesas.find((m) => m.id.toString() === value);
            setMesaSelecionada(mesa || null);
          }}
        >
          <SelectTrigger className="w-[200px] outline-none border-2">
            <SelectValue placeholder="Selecione a mesa..." />
          </SelectTrigger>
          <SelectContent className="bg-white border-none outline-none">
            <SelectGroup>
              <SelectLabel>Mesas</SelectLabel>
              {mesas.map((mesa) => (
                <SelectItem key={mesa.id} value={mesa.id.toString()}>
                  Mesa {mesa.numero}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <button
          onClick={handleConfirmar}
          disabled={!mesaSelecionada}
          className={`w-[200px] text-center p-1 rounded-md transition-all ${
            mesaSelecionada
              ? "bg-white hover:bg-white/85 text-black"
              : "bg-gray-200 text-black/40 cursor-not-allowed"
          }`}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
