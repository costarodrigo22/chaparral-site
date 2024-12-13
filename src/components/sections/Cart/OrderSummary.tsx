'use client';

import { Separator } from '@/components/ui/Separator';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/Cart/CartContext';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrderSummary() {
	const { totalCart } = useCart();

	const router = useRouter();

	function handleNavigateToAddress() {
		router.push('/Delivery');
	}

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

			<Button
				onClick={handleNavigateToAddress}
				className='w-full rounded-full mt-5 bg-[#2B0036] hover:bg-[#421d4b]'
			>
				Continuar a compra
				<ArrowRight />
			</Button>

			{/* <BuyModalTrigger /> */}
		</div>
	);
}
