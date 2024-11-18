'use client';

import ProductsListCart from './ProductsListCart';
import OrderSummary from './OrderSummary';
import { useCart } from '@/contexts/Cart/CartContext';

export default function CartCheck() {
  const { total } = useCart();

  return (
    <div>
      {total === 0 ? (
        <div className="text-lg flex items-center justify-center text-center font-semibold w-full h-[300px]">
          <h2>O seu carrinho está vazio 😢</h2>
        </div>
      ) : (
        <div className="flex gap-9 flex-col lg:flex-row ">
          <ProductsListCart />
          <OrderSummary />
        </div>
      )}
    </div>
  );
}
