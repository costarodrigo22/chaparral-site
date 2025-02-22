import CartCheck from '@/components/sections/Cart/CartCheck';
import { ChevronRight } from 'lucide-react';

export default async function Cart() {
  return (
    <div className="flex flex-col w-full mb-10">
      <div className="flex justify-between items-center w-full mt-28 md:px-10 lg:px-32 mb-10">
        <span className="text-2xl font-bold">Meu carrinho</span>

        <a
          href="/"
          className="text-[#2B0036] text-base font-medium flex hover:underline cursor-pointer"
        >
          Voltar ao início
          <ChevronRight />
        </a>
      </div>

      <div className=" md:px-10 lg:px-24">
        <CartCheck />
      </div>
    </div>
  );
}
