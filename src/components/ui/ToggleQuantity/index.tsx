'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { ComponentProps, useState } from 'react';

interface IToggleQuantity extends ComponentProps<'div'> {
	initialQuantity?: number;
	onIncrement?: (quantity: number) => void;
	onDecrement?: (quantity: number) => void;
}

export default function ToggleQuantity({
	className,
	initialQuantity,
	onIncrement,
	onDecrement,
}: IToggleQuantity) {
	const [quantity, setQuantity] = useState(initialQuantity ?? 0);

	function handleIncrement() {
		const newQuantity = quantity + 1;

		setQuantity(newQuantity);

		if (onIncrement) {
			onIncrement(newQuantity);
		}
	}

	const handleDecrement = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			if (onDecrement) {
				onDecrement(newQuantity);
			}
		}
	};

	return (
		<div
			className={cn(
				'bg-[#F0F0F0] flex w-[170px] h-[50px] rounded-full items-center justify-between',
				className
			)}
		>
			<div
				className='cursor-pointer w-3/4 h-full flex items-center justify-center rounded-l-full hover:bg-zinc-200 transition-all'
				onClick={handleDecrement}
			>
				<Minus />
			</div>

			<span className='px-2 font-medium'>{quantity}</span>

			<div
				className='cursor-pointer w-3/4 h-full flex items-center justify-center rounded-r-full hover:bg-zinc-200 transition-all'
				onClick={handleIncrement}
			>
				<Plus />
			</div>
		</div>
	);
}
