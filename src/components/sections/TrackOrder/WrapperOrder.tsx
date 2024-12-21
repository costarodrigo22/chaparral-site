import { useCallback, useEffect } from 'react';
import DetailsOrder from './DetailsOrder';
import PickUpLocal from './PickUpLocal';
import PickUpTime from './PickUpTime';
import PickUpWhatsApp from './PickUpWhatsApp';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/services/orders';

interface IWrapperOrderProps {
	id: string;
}

export default function WrapperOrder({ id }: IWrapperOrderProps) {
	// const handleGetOrderData = useCallback(async () => {

	// }, []);

	// useEffect(() => {}, []);

	const { data, isLoading } = useQuery({
		queryKey: ['getOrderById'],
		queryFn: () => getOrderById(id),
	});

	if (isLoading) {
		return (
			<div className='flex xl:px-32 gap-9 flex-col'>
				<span>Carregando pedido...</span>
			</div>
		);
	}

	return (
		<div className='flex xl:px-32 gap-9 flex-col'>
			<PickUpTime orderNumber={data.order_number_omie} />

			<PickUpLocal />

			<DetailsOrder />

			<PickUpWhatsApp />
		</div>
	);
}
