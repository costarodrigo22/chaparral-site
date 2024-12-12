'use client';

import { Separator } from '@/components/ui/Separator';
import BuyModalTrigger from '../Delivery/BuyModalTrigger';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/Cart/CartContext';

export default function OrderSummary() {
	const { totalCart } = useCart();

	return (
		<div className='lg:w-[40%] w-full rounded-md border p-5'>
			<span className='text-[#1E1E1E] text-2xl font-semibold'>
				Resumo do Pedido
			</span>

			<div className='flex justify-between items-center mt-5'>
				<p className='opacity-60 font-medium text-base'>Subtotal</p>
				<p className='font-medium text-base'>{formatCurrency(totalCart)}</p>
			</div>

			<Separator className='mt-5' />

			<div className='flex justify-between items-center mt-5'>
				<p className='text-[#1E1E1E] font-medium text-lg'>Total</p>
				<p className='font-semibold text-lg'>{formatCurrency(totalCart)}</p>
			</div>

			<BuyModalTrigger />
		</div>
	);
}
