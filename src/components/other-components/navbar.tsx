import { CirclePercent, Search, ShoppingBasket, Wallet } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-[70px] max-h-[70px] bg-black text-white">
      <span className="bg-gray-800 ml-16 py-1 px-4 rounded-sm">MESA 1</span>
      <div className="relative w-[250px]">
        <Input
          type="text"
          placeholder="Busque o produto..."
          className="w-full pl-10 border-2"
        />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" />
      </div>
      <div>
        <Button className="h-[70px] bg-orange-500 rounded-none border-l border-r">
          Ofertas
          <CirclePercent />
        </Button>
        <Button className="h-[70px] bg-orange-500 rounded-none border-r">
          Carrinho
          <ShoppingBasket />
        </Button>
        <Button className="h-[70px] bg-orange-500 rounded-none">
          Conta
          <Wallet />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;