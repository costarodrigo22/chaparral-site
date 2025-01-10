'use client';

import Image from 'next/image';
import logoCard from '../../../../public/card.svg';
import logoPix from '../../../../public/pix.svg';
import logoBoleto from '../../../../public/boleto.svg';
import { Separator } from '@/components/ui/Separator';
import { formatCurrency } from '@/lib/utils';

interface IDetails {
  total: number;
  patmentForm: string;
}

export default function DetailsOrder({ patmentForm, total }: IDetails) {
  return (
    <div className="w-full px-6 py-6 shadow-md rounded-md">
      <span className="text-base">Detalhes do pedido</span>

      <div className="flex items-center justify-between mb-3">
        <div className="mt-2 flex gap-1 w-[400px] justify-between">
          <span className="text-base">Valor Total</span>
          <span className="text-[#1E1E1E] font-semibold text-base">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <Separator />

      <div className="mt-2 flex gap-1 w-full justify-between">
        <span className="text-base opacity-60">Forma Pagamento</span>

        <div className="flex gap-1 items-center">
          {patmentForm === 'CreditCardDelivery' ||
            (patmentForm === 'DebitCardDelivery' && (
              <Image
                src={logoCard}
                alt="logo do cartão"
                width={21}
                height={14}
              />
            ))}

          {patmentForm === 'PixSite' && (
            <Image src={logoPix} alt="logo do pix" width={21} height={14} />
          )}

          {patmentForm === 'Boleto' && (
            <Image
              src={logoBoleto}
              alt="logo do boleto"
              width={21}
              height={14}
            />
          )}

          <span className="text-[#1E1E1E] font-semibold text-sm">
            {patmentForm === 'CreditCardDelivery'
              ? 'Cartão de Crédito'
              : patmentForm === 'DebitCardDelivery'
              ? 'Cartão de Débito'
              : patmentForm === 'PixSite'
              ? 'Pix'
              : 'Boleto'}
          </span>
        </div>
      </div>
    </div>
  );
}
