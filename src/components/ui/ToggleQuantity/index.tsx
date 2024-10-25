'use client';

import { useQuantity } from '@/contexts/Cart/QuantityContext';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { ComponentProps } from 'react';

interface IToggleQuantity extends ComponentProps<'div'> {}

export default function ToggleQuantity({ className }: IToggleQuantity) {
	const { quantity, setQuantity } = useQuantity();

	function handleIncrement() {
		setQuantity(quantity + 1);
	}

	function handleDecrement() {
		setQuantity(Math.max(quantity - 1, 1));
	}

	return (
		<div
			className={cn(
				'bg-[#F0F0F0] flex w-[170px] h-[50px] rounded-full items-center justify-between',
				className
			)}
		>
			<div className='cursor-pointer w-3/4 h-full flex items-center justify-center rounded-l-full hover:bg-zinc-200 transition-all'>
				<Minus className='' onClick={handleDecrement} />
			</div>

			<span className='px-2 font-medium'>{quantity}</span>

			<div className='cursor-pointer w-3/4 h-full flex items-center justify-center rounded-r-full hover:bg-zinc-200 transition-all'>
				<Plus className='' onClick={handleIncrement} />
			</div>
		</div>
	);
}
