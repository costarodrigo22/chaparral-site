'use client';

import { useCart } from '@/contexts/Cart/CartContext';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { ComponentProps } from 'react';

interface IToggleQuantity extends ComponentProps<'div'> {}

export default function ToggleQuantity({ className }: IToggleQuantity) {
	const { quantity, incrementQuantity, decrementQuantity } = useCart();

	return (
		<div
			className={cn(
				'bg-[#F0F0F0] flex w-[170px] h-[50px] rounded-full items-center justify-between',
				className
			)}
		>
			<div
				className='cursor-pointer w-3/4 h-full flex items-center justify-center rounded-l-full hover:bg-zinc-200 transition-all'
				onClick={decrementQuantity}
			>
				<Minus />
			</div>

			<span className='px-2 font-medium'>{quantity}</span>

			<div
				className='cursor-pointer w-3/4 h-full flex items-center justify-center rounded-r-full hover:bg-zinc-200 transition-all'
				onClick={incrementQuantity}
			>
				<Plus />
			</div>
		</div>
	);
}
