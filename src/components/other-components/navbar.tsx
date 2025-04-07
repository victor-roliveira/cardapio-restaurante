"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import logoHome from "@/app/assets/icon-home.svg";

import CartMenu from "../other-components/cart-menu";
import PaymentMenu from "./payment-menu";
import DialogCreateAccount from "./dialog-create-account";
import CallWaiter from "./call-waiter";
import DialogSearchProducts from "./dialog-search-products";

const Navbar = () => {
  const [numeroMesa, setNumeroMesa] = useState<number | null>(null);

  useEffect(() => {
    const mesaSelecionada = localStorage.getItem("mesaSelecionada");
    if (mesaSelecionada) {
      const mesa = JSON.parse(mesaSelecionada);
      setNumeroMesa(mesa.numero);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between h-[70px] bg-black text-white">
      <div className="flex items-center gap-4">
        <span className="bg-gray-800 ml-16 py-1 px-4 rounded-sm">
          {numeroMesa ? `MESA ${numeroMesa}` : "Selecione uma mesa"}
        </span>
        <Link href="/cardapio">
          <Image src={logoHome} alt="logo home" width={30} />
        </Link>
        <DialogCreateAccount />
      </div>

      <DialogSearchProducts />

      <div className="flex items-center relative">
        <CallWaiter />
        <CartMenu />
        <PaymentMenu />
      </div>
    </nav>
  );
};

export default Navbar;
