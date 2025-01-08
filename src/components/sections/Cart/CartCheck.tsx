'use client';

import ProductsListCart from './ProductsListCart';
import OrderSummary from './OrderSummary';
import { useCart } from '@/contexts/Cart/CartContext';
// import logo from '../../../../public/logo-iaca-purple.svg';
// import Image from 'next/image';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartCheck() {
  const { quantityItemCart, loadingCart, updatedCart } = useCart();

  useEffect(() => {
    updatedCart();
  }, [updatedCart]);

  if (loadingCart) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[400px]">
        <div className="flex gap-9 flex-col lg:flex-row w-full items-center justify-center">
          <Skeleton className="h-[200px] w-full rounded-md lg:w-[60%]" />
          <Skeleton className="h-[200px] w-full rounded-md lg:w-[40%]" />
        </div>
        {/* <Image src={logo} alt="Iaça logo" />
        <span className="text-[#320e3a]">carregando carrinho Íaça...</span> */}
      </div>
    );
  }

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      {quantityItemCart === 0 ? (
        <div className="text-lg flex items-center justify-center flex-col font-semibold w-full h-[400px]">
          <h2>O seu carrinho está vazio 😢</h2>
        </div>
      ) : (
        <div className="flex gap-9 flex-col lg:flex-row w-full ">
          <ProductsListCart />
          <OrderSummary />
        </div>
      )}
    </div>
  );
}
