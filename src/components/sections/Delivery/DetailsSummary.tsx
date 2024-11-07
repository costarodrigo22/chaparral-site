'use client';

import { Separator } from '@/components/ui/Separator';
import { useCart } from '@/contexts/Cart/CartContext';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

export default function DetailsSummary() {
	const { total, quantity } = useCart();

	const cartLocalStorage = localStorage.getItem('cart');

	const value_unit = JSON.parse(cartLocalStorage || '').param[0].itens[0]
		.valor_unitario;

	const name_product = JSON.parse(cartLocalStorage || '').nomeProduto;

	const urlImage = JSON.parse(cartLocalStorage || '').urlImage;

	return (
		<>
			<div className='mt-6'>
				<div className='flex items-center gap-4'>
					<div className='w-[50px] h-[70px] rounded-sm'>
						<Image width={50} height={70} src={urlImage} alt='Foto açaí' />
					</div>

					<div className='flex flex-col gap-2'>
						<span className='text-[#2B0036] font-semibold text-base'>
							{name_product}
						</span>
						<p className='text-[#1E1E1E] text-[14px]'>
							{quantity}x {formatCurrency(value_unit)}
						</p>
					</div>
				</div>
			</div>

			<div className='flex justify-between items-center mt-5'>
				<p className='opacity-60 font-medium text-base'>Subtotal</p>
				<p className='font-medium text-base'>{formatCurrency(total)}</p>
			</div>

			<Separator className='mt-5' />

			<div className='flex justify-between items-center mt-5'>
				<p className='text-[#1E1E1E] font-medium text-lg'>Total</p>
				<p className='font-semibold text-lg'>{formatCurrency(total)}</p>
			</div>
		</>
	);
}
