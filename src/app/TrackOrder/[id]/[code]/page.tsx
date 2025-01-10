import { ChevronRight } from 'lucide-react';
import WrapperOrder from '@/components/sections/TrackOrder/WrapperOrder';

interface ITrackOrderProps {
  params: {
    id: string;
    code: string;
  };
}

export default async function TrackOrder({ params }: ITrackOrderProps) {
  return (
    <div className="flex flex-col w-full mb-10 min-h-[500px]">
      <div className="flex justify-between items-center w-full mt-28 xl:px-32 mb-10">
        <span className="text-base md:text-xl lg:text-2xl font-bold">
          Acompanhar pedido
        </span>

        <a
          href="/"
          className="text-[#2B0036] text-xs lg:text-base font-medium flex hover:underline cursor-pointer"
        >
          Voltar ao início
          <ChevronRight />
        </a>
      </div>

      <WrapperOrder id={params.id} code={Number(params.code)} />
    </div>
  );
}
