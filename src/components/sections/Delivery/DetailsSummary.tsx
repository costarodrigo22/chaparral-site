'use client';

import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { useCart } from '@/contexts/Cart/CartContext';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import logo from '../../../../public/logo-iaca-purple.svg';
import React from 'react';
import { useDelivery } from '@/contexts/Cart/DeliveryContext';

interface IDetailsSummaryProps {
  btnConfirm?: boolean;
}

export default function DetailsSummary({ btnConfirm }: IDetailsSummaryProps) {
  const { totalCart, items, loadingCart } = useCart();

  const { freight } = useDelivery();

  if (loadingCart) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <Image src={logo} alt="Iaça logo" priority />
        <span className="text-[#320e3a]">carregando resumo do pedido...</span>
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[70px] rounded-sm">
                <Image
                  width={50}
                  height={70}
                  src={item.product_url_image}
                  priority
                  alt="Foto açaí"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#2B0036] font-semibold text-base">
                  {item.product_name}
                </span>
                <p className="text-[#1E1E1E] text-[14px]">
                  {item.product_quantity}x {formatCurrency(item.product_price)}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}

      <div className="flex justify-between items-center mt-5">
        <p className="opacity-60 font-medium text-base">Subtotal</p>
        <p className="font-medium text-base">{formatCurrency(totalCart)}</p>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="opacity-60 font-medium text-base">Taxa de entrega</p>
        <p className="font-medium text-base">{formatCurrency(freight)}</p>
      </div>

      <Separator className="mt-5" />

      <div className="flex justify-between items-center mt-5">
        <p className="text-[#1E1E1E] font-medium text-lg">Total</p>
        <p className="font-semibold text-lg">
          {formatCurrency(totalCart + freight)}
        </p>
      </div>

      {btnConfirm && (
        <Button className="bg-[#2B0036] w-full rounded-full mt-5 hover:bg-[#5a3663]">
          <a
            href="/Payment"
            className="flex items-center w-full h-full justify-center"
          >
            Escolher forma de pagamento
            <ArrowRight />
          </a>
        </Button>
      )}
    </>
  );
}
