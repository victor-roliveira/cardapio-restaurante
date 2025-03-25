import Image from "next/image";
import logoRestaurante from "../../app/assets/logo-restaurante.png";

import SomePizzas from "./some-pizzas";
import SomeMasses from "./some-masses";
import SomeDrinks from "./some-drinks";

const SomeFoods = () => {
  return (
    <section className="bg-slate-950 w-full">
      <div className="w-full h-[400px] bg-black text-white pt-20">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image src={logoRestaurante} alt="Logo do restaurante" />
          {/*<h1 className="text-6xl">LOGO RESTAURANTE</h1>*/}
          <h2 className="text-2xl font-bold">
            Há mais de 10 anos oferecendo o melhor para você.
          </h2>
          <p className="text-sm text-white/75">
            Acesse mais dos nossos produtos através do menu ao lado.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-center  pb-10">
        <p className="text-white text-2xl font-semibold py-2">
          Algumas das Pizzas
        </p>
        <div className="flex gap-4">
          <SomePizzas />
        </div>
      </div>
      <div className="flex flex-col items-center text-white text-center pb-10">
        <p className="text-white text-2xl font-semibold py-2">
          Algumas das Massas
        </p>
        <SomeMasses />
      </div>
      <div className="flex flex-col items-center mb-10 text-white text-center">
        <p className="text-white text-2xl font-semibold py-2">Alguns Drinks</p>
        <SomeDrinks />
      </div>
    </section>
  );
};

export default SomeFoods;
