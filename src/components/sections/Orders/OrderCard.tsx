import { cn, formatCurrency, formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Order } from './OrderCardTypes';
import ModalOrderDetails from './ModalOrderDetails';
import { useState } from 'react';

interface OrderCardProps {
  order_number_omie: string;
  order_code_omie: string;
  createdAt: string;
  total: number;
  status: string;
  pixId?: string;
  fullOrder: Order;
}

export default function OrderCard({
  createdAt,
  order_number_omie,
  order_code_omie,
  status,
  total,
  pixId,
  fullOrder,
}: OrderCardProps) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const router = useRouter();
  function handleGetBgAndColor(status: string) {
    switch (status) {
      case 'Aguardando pagamento':
        return 'bg-[#FF9D001A] text-[#FF9D00]';
      case 'Pagamento realizado':
        return 'bg-[#0054FF1A] text-[#0054FF]';
      case 'Entregue':
        return 'bg-[#11A1471A] text-[#11A147]';
      default:
        return 'bg-[#0054FF1A] text-[#0054FF]';
    }
  }
  function handlePushPixPage() {
    pixId &&
      router.push(
        `/PixPage/${pixId}?order_number=${order_number_omie}&code_order=${order_code_omie}`
      );
  }

  return (
    <>
      <ModalOrderDetails
        handleGetBgAndColor={handleGetBgAndColor}
        order={fullOrder}
        onClose={() => setOpenModalDetails(false)}
        open={openModalDetails}
      />
      <div className="w-full min-h-[170px] p-10 flex flex-col sm:flex-row justify-between gap-10 bg-white shadow-[0px_0px_10px_0px_#0000001A] rounded-[10px] ">
        <div className="flex flex-col font-bold text-base text-lightGray gap-4 ">
          <span>
            N° pedido:{' '}
            <span className=" font-medium ">{order_number_omie}</span>
          </span>
          <span>
            Valor:{' '}
            <span className=" font-medium ">{formatCurrency(total)}</span>
          </span>
          <span>
            Data:{' '}
            <span className=" font-medium ">{formatDateTime(createdAt)}</span>
          </span>
          <span>
            Status:{' '}
            <span
              className={cn(
                ' font-medium px-2 py-1 rounded-[57px] ',
                handleGetBgAndColor(status)
              )}
            >
              {status}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-center flex-col gap-5 ">
          <div
            className="flex gap-4 items-center justify-center cursor-pointer hover:opacity-80"
            onClick={() => setOpenModalDetails(true)}
          >
            <span className=" font-medium text-base underline text-[#00000099]">
              Mais detalhes
            </span>
            <Image
              src="/arrow-right-purple.svg"
              alt="ir para detalhes"
              width={8}
              height={14}
            />
          </div>
          {status === 'Aguardando pagamento' && (
            <div
              className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
              onClick={handlePushPixPage}
            >
              <Image
                src="/pix-icon.svg"
                alt="Logo do pix"
                width={22}
                height={22}
              />
              <span className="font-medium text-sm text-black">
                Página do pix
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
