'use client';

import DetailsOrder from './DetailsOrder';
import PickUpLocal from './PickUpLocal';
import PickUpTime from './PickUpTime';
import PickUpWhatsApp from './PickUpWhatsApp';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/services/orders';
import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/axiosInstance';

interface IWrapperOrderProps {
  id: string;
  code: number;
}

export default function WrapperOrder({ id, code }: IWrapperOrderProps) {
  const [orderStatus, setOrderAtatus] = useState('');
  const [loadingOrderStatus, setLoadingOrderAtatus] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['getOrderById'],
    queryFn: () => getOrderById(id),
  });

  const handleGetInfosOrder = useCallback(async () => {
    setLoadingOrderAtatus(true);

    try {
      const response = await api.get(`/api/without/omie/consult_sale/${code}`);

      setOrderAtatus(response.data.pedido_venda_produto.cabecalho.etapa);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOrderAtatus(false);
    }
  }, [code]);

  useEffect(() => {
    handleGetInfosOrder();
  }, [handleGetInfosOrder]);

  if (isLoading || loadingOrderStatus) {
    return (
      <div className="flex xl:px-32 gap-9 flex-col">
        <span>Carregando pedido...</span>
      </div>
    );
  }

  if (orderStatus === '50') {
    return (
      <div className="flex items-center justify-center xl:px-32 gap-9 flex-col">
        <span>O seu pedido já foi entregue 😉</span>
      </div>
    );
  }

  return (
    <div className="flex xl:px-32 gap-9 flex-col">
      <PickUpTime
        orderNumber={data.order_number_omie}
        delivery_form={data.delivery_form}
      />

      <PickUpLocal
        delivery_form={data.delivery_form}
        address={{
          cep: data.address.cep,
          city: data.address.city,
          complement: data.address.complement,
          neighborhood: data.address.neighborhood,
          number: data.address.number,
          street: data.address.street,
        }}
      />

      <DetailsOrder total={data.total} patmentForm={data.payment_form} />

      <PickUpWhatsApp />
    </div>
  );
}
