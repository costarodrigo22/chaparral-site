import DeliveryOrPickupSelector from '@/components/sections/Delivery/DeliveryOrPickupSelector';
import DetailsSummary from '@/components/sections/Delivery/DetailsSummary';
import { Separator } from '@/components/ui/Separator';
import { ChevronRight } from 'lucide-react';

export default function Delivery() {
  return (
    <div className="flex flex-col w-full mb-10 min-h-[600px]">
      <div className="flex justify-between items-center w-full mt-28 md:px-10 lg:px-32 mb-10">
        <span className=" text-base md:text-xl lg:text-2xl font-bold">
          Como quer receber o produto?
        </span>

        <a
          href="/"
          className="text-[#2B0036] text-xs lg:text-base font-medium items-center flex hover:underline cursor-pointer"
        >
          <span>Voltar ao início</span>
          <ChevronRight />
        </a>
      </div>

      <div className="flex md:px-10 lg:px-32 gap-9 flex-col lg:flex-row">
        <div className="w-full xl:p-5 flex flex-col">
          <DeliveryOrPickupSelector />
        </div>

        <div className="w-full rounded-md border p-5">
          <span className="text-[#1E1E1E] text-2xl font-semibold">
            Resumo do Pedido
          </span>

          <Separator className="mt-5" />

          <DetailsSummary btnConfirm />
        </div>
      </div>
    </div>
  );
}
