import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-5 bg-orange-500 w-[400px] p-10 rounded-md text-white">
        <h1 className="text-4xl">Cardápio Digital</h1>
        <p className="text-xl text-white/80">Escolha a mesa</p>
        <Select>
          <SelectTrigger className="w-[200px] outline-none">
            <SelectValue placeholder="Selecione a mesa..." />
          </SelectTrigger>
          <SelectContent className="bg-white border-none outline-none">
            <SelectGroup>
              <SelectLabel>Mesas</SelectLabel>
              <SelectItem value="1">Mesa 1</SelectItem>
              <SelectItem value="2">Mesa 2</SelectItem>
              <SelectItem value="3">Mesa 3</SelectItem>
              <SelectItem value="4">Mesa 4</SelectItem>
              <SelectItem value="5">Mesa 5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Link
          href="/cardapio"
          className="w-[200px] text-center p-1 bg-white hover:bg-white/85 text-black rounded-md transition-all"
        >
          Confirmar
        </Link>
      </div>
    </div>
  );
}
