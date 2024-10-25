'use client';

import { Button } from '@/components/ui/Button';
import ToggleQuantity from '@/components/ui/ToggleQuantity';
import { useQuantity } from '@/hooks/useQuantity';
import { ShoppingCart } from 'lucide-react';

export default function FooterProducts() {
	const { quantity } = useQuantity();

	function handleAddToCart() {
		console.log('api call: ', quantity);
	}

	return (
		<div className='flex justify-between items-center w-full'>
			<ToggleQuantity />

			<Button
				className='rounded-full w-[380px] h-[50px]'
				onClick={handleAddToCart}
			>
				Adicionar ao carrino
				<ShoppingCart />
			</Button>
		</div>
	);
}
