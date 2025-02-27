import Navbar from "@/components/other-components/navbar";
import MenuCategories from "@/components/other-components/menu-category";
import SomeFoods from "@/components/other-components/some-foods";

const Cardapio = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <MenuCategories />
        <SomeFoods />
      </div>
    </>
  );
};

export default Cardapio;
