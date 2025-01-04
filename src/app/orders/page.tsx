'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { httpClient } from '@/lib/httpClient';

export default function PersonalInfos() {
  const getOrders = useCallback(async () => {
    try {
      const { data } = await httpClient.get('/user/order');
      console.log(data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar perdidos', error);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

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

        <span className="text-black font-medium">Pedidos</span>
      </div>
      <div className="flex items-center px-0 md:px-10 xl:px-32 mb-8">
        <ChevronLeft size={20} className="" color="#2B0036" />

        <Link href="/">
          <span className="text-[#2B0036] font-medium cursor-pointer hover:underline">
            Voltar
          </span>
        </Link>
      </div>
      <div className="flex items-center w-full px-0 md:px-10 xl:px-32">
        <span className="text-[#1E1E1E] text-[30px] font-bold">
          Meus pedidos
        </span>
      </div>

      <div className="flex items-center w-full px-0 md:px-10 xl:px-32">
        <span>teste</span>
      </div>
    </div>
  );
}
