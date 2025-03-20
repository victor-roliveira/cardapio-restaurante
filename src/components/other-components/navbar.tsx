import { Search } from "lucide-react";
import iconWallet from "../../app/assets/wallet.svg";
import bellIcon from "../../app/assets/bell-icon.svg";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

import logoHome from "../../app/assets/icon-home.svg";
import Image from "next/image";
import CartMenu from "./cart-menu";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-[70px] max-h-[70px] bg-black text-white">
      <div className="flex items-center gap-4">
        <span className="bg-gray-800 ml-16 py-1 px-4 rounded-sm">MESA 1</span>
        <Link href="/cardapio">
          <Image src={logoHome} alt="logo home" width={30} />
        </Link>
      </div>
      <div className="border-b p-1">
        <div className="relative w-[250px]">
          <Input
            type="text"
            placeholder="Busque o produto..."
            className="w-full pl-10 border-none shadow-none"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="flex items-center relative">
        <Button className="h-[70px]  bg-orange-500 rounded-none border-l border-r text-center break-words">
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
