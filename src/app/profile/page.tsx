import { ChevronRight, Eye, MapPin, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="flex flex-col w-full mb-10">
      <div className="flex items-center w-full mt-28 px-0 md:px-10 xl:px-32 mb-8">
        <span className="opacity-60 font-medium">Inicio</span>

        <ChevronRight
          size={14}
          className="mt-1 opacity-60"
          color="#000"
          opacity={60}
        />

        <span className="text-black font-medium">Infos</span>
      </div>

      <div className="flex items-center w-full px-0 md:px-10 xl:px-32 mb-8">
        <span className="text-[#1E1E1E] text-[30px] font-bold">
          Informações do perfil
        </span>
      </div>

      <div className="flex flex-col px-0 md:px-10 xl:px-32 gap-9">
        <div className="flex items-center w-full p-6 shadow-sm rounded-md">
          <User className="mr-6" color="#2B0036" />

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[#1E1E1E] text-[16px] font-semibold">
                Dados Pessoais
              </span>
              <span className="text-[#1E1E1E] text-[16px] font-normal">
                Informações pessoais
              </span>
            </div>

            <Link href="/personal-infos">
              <Eye className="cursor-pointer" />
            </Link>
          </div>
        </div>

        <div className="flex items-center w-full p-6 shadow-sm rounded-md">
          <MapPin className="mr-6" color="#2B0036" />

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[#1E1E1E] text-[16px] font-semibold">
                Endereço
              </span>
              <span className="text-[#1E1E1E] text-[16px] font-normal">
                Informações pessoais
              </span>
            </div>

            <Link href="/address">
              <Eye className="cursor-pointer" />
            </Link>
          </div>
        </div>

        <div className="flex items-center w-full p-6 shadow-sm rounded-md">
          <ShieldCheck className="mr-6" color="#2B0036" />

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[#1E1E1E] text-[16px] font-semibold">
                Segurança
              </span>
            </div>

            <Eye className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
