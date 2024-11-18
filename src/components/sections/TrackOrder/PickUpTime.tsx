'use client';

import Image from 'next/image';
import imgOrder from '../../../../public/img-order.svg';
import { useEffect } from 'react';

export default function PickUpTime() {
  const order = Number(localStorage.getItem('order_number'));

  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="w-full px-6 py-6 shadow-md rounded-md">
      <li className="text-base">
        O seu pedido esta sendo preparado e em breve saíra pra entrega
      </li>

      <div className="flex items-center justify-between">
        <div className="px-6 mt-2 flex flex-col gap-1">
          <span className="text-[#898989] text-base font-bold">
            N° pedido: {order}
          </span>

          <span className="text-[#898989] text-base">
            Para a retirada , é necessário informar o código do pedido.{' '}
          </span>
        </div>

        <Image
          className="hidden md:block"
          src={imgOrder}
          alt="Imagem da página de acompanhar o pedido"
          width={143}
          height={125}
        />
      </div>
    </div>
  );
}
