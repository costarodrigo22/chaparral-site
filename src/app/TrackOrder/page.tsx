import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PickUpTime from '@/components/sections/TrackOrder/PickUpTime';
import DetailsOrder from '@/components/sections/TrackOrder/DetailsOrder';
import PickUpLocal from '@/components/sections/TrackOrder/PickUpLocal';
import PickUpWhatsApp from '@/components/sections/TrackOrder/PickUpWhatsApp';

export default async function TrackOrder() {
  return (
    <div className="flex flex-col w-full mb-10">
      <div className="flex justify-between items-center w-full mt-28 xl:px-32 mb-10">
        <span className="text-base md:text-xl lg:text-2xl font-bold">
          Acompanhar pedido
        </span>

        <Link
          href="/"
          className="text-[#2B0036] text-xs lg:text-base font-medium flex hover:underline cursor-pointer"
        >
          Voltar ao início
          <ChevronRight />
        </Link>
      </div>

      <div className="flex xl:px-32 gap-9 flex-col">
        <PickUpTime />

        <PickUpLocal />

        <DetailsOrder />

        <PickUpWhatsApp />
      </div>
    </div>
  );
}
