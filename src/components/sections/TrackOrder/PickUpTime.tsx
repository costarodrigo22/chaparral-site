'use client';

import Image from 'next/image';
import imgOrder from '../../../../public/img-order.svg';
// import { useEffect } from 'react';

export default function PickUpTime({
  orderNumber,
  delivery_form,
}: {
  orderNumber: string;
  delivery_form: string;
}) {
  // const order = Number(localStorage.getItem('order_number'));

  // useEffect(() => {
  // 	localStorage.removeItem('cart');
  // }, []);

  return (
    <div className="w-full px-6 py-6 shadow-md rounded-md">
      <li className="text-base">
        {delivery_form === 'ENTREGA'
          ? 'Seu pedido está sendo preparado e, em breve, sairá para entrega.'
          : 'Seu pedido está pronto para retirada. Por favor, dirija-se ao local de retirada.'}
      </li>

      <div className="flex items-center justify-between">
        <div className="px-6 mt-2 flex flex-col gap-1">
          <span className="text-[#898989] text-base font-bold">
            N° pedido: {orderNumber}
          </span>

          <span className="text-[#898989] text-base">
            Para {delivery_form === 'ENTREGA' ? 'o recebimento' : 'a retirada'},
            é necessário informar o código do pedido.{' '}
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
