'use client';

import ToggleQuantity from '@/components/ui/ToggleQuantity';
import { formatCurrency } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/Cart/CartContext';

export default function ProductsListCart() {
  const { clearCart } = useCart();

  const product = localStorage.getItem('cart');
  let valueCart = 0;
  let nameProduct = '';
  let urlImage = '';

  try {
    const productLocalStorageParse = product ? JSON.parse(product) : null;
    if (
      productLocalStorageParse &&
      productLocalStorageParse.param?.[0]?.itens?.[0]
    ) {
      valueCart =
        productLocalStorageParse.param[0].itens[0].valor_unitario || 0;
      nameProduct = productLocalStorageParse.nomeProduto || 'Produto';
      urlImage =
        productLocalStorageParse.urlImage || '/path-to-default-image.jpg';
    }
  } catch (error) {
    console.error("Erro ao parsear dados do 'cart' do localStorage:", error);
  }

  return (
    <div className="lg:w-[60%] w-full rounded-md border p-5 flex flex-col">
      <div className="flex justify-between md:flex-row flex-col items-center gap-5 md:items-start md:gap-0">
        <div className="flex">
          <div className="bg-[#F0F0F0] w-[100px] h-[100px] rounded-sm">
            <Image width={100} height={100} src={urlImage} alt="Foto açaí" />
          </div>

          <div className="flex flex-col ml-4 gap-4">
            <span className="text-[#2B0036] text-base font-medium">
              {nameProduct}
            </span>
            <span className="font-semibold text-sm">
              {formatCurrency(valueCart)}
            </span>
          </div>
        </div>

        <div className="flex items-end">
          <ToggleQuantity className="w-[120px] h-[40px]" />

          <Trash2
            color="#FF3333"
            className="mb-2 ml-4 cursor-pointer"
            size={20}
            onClick={clearCart}
          />
        </div>
      </div>
    </div>
  );
}
