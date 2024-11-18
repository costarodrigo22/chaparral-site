import Image from 'next/image';
import FindUs from './components/FindUs';
import FoodService from './components/FoodService';
import Footer from './components/Footer';
import Header from './components/Header';
import Others from './components/Others';
import Products from './components/Products';
import Recipes from './components/Recipes';
import ShowProduct from './components/ShowProduct';
import Button from './global/components/button';

export default function Home() {
  return (
    <CartProvider>
      <div className="w-full h-full">
        <Header />
        <Others />
        <Products />
        <ShowProduct />
        <div className="lg:mx-5 xl:mx-10 mb-10" id="receitas">
          <div className=" lg:h-[715px]">
            <Recipes />
          </div>
          <div className="w-full h-auto flex items-center justify-center mt-8">
            <Button
              text="Veja mais"
              classNameCustom="bg-transparent hover:bg-black/10"
              classNameText="text-black"
              src="/arrow-right-black.svg"
            />
          </div>
        </div>
        <FoodService />
        <FindUs />
        <div className=" lg:mx-8">
          <Footer />
        </div>
        <div className="w-full h-full relative">
          <Image
            className="z-50 hover:cursor-pointer right-1 bottom-[25px] fixed animate-shakeWithPause"
            src="/whatsapp-icon.svg"
            alt="Ícone do whatsapp"
            width={70}
            height={70}
          />
        </div>
      </div>
    </CartProvider>
  );
}
