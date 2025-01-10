'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { httpClient } from '@/lib/httpClient';
import {
  Order,
  OrderResponse,
} from '@/components/sections/Orders/OrderCardTypes';
import OrderCard from '@/components/sections/Orders/OrderCard';
import { useRouter } from 'next/navigation';

export default function PersonalInfos() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await httpClient.get<OrderResponse>('/user/order');
      setOrders(data.item.item);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar pedidos', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
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

        {isLoading ? (
          <div>
            <div className="px-0 md:px-10 xl:px-32 flex flex-col gap-5 mt-6">
              <Skeleton className="w-full min-h-[170px] p-10 shadow-[0px_0px_10px_0px_#0000001A] rounded-[10px]" />
              <Skeleton className="w-full min-h-[170px] p-10 shadow-[0px_0px_10px_0px_#0000001A] rounded-[10px]" />
              <Skeleton className="w-full min-h-[170px] p-10 shadow-[0px_0px_10px_0px_#0000001A] rounded-[10px]" />
            </div>
          </div>
        ) : (
          <div className="mt-6 flex min-h-[400px] items-center flex-col gap-5 w-full px-0 md:px-6 xl:px-32">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  fullOrder={order}
                  order_number_omie={order.order_number_omie}
                  order_code_omie={order.order_code_omie}
                  createdAt={order.createdAt}
                  total={order.total}
                  status={order.orderStatus}
                  pixId={order.id_pix_omie}
                />
              ))
            ) : (
              <div className="flex flex-col gap-3 items-center justify-center mt-[40px]">
                <span>Você não tem pedidos ainda. 😢</span>
                <span>
                  <span
                    className="underline text-darkPurple font-medium text-lg cursor-pointer hover:opacity-80"
                    onClick={() => router.push('/product/11')}
                  >
                    Clique aqui
                  </span>{' '}
                  para comprar nosso açaí
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
