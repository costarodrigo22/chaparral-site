'use client';

import ProductsListCart from './ProductsListCart';
import OrderSummary from './OrderSummary';
import { useCart } from '@/contexts/Cart/CartContext';

export default function CartCheck() {
	const { total } = useCart();

	return (
		<div>
			{total === 0 ? (
				<div className='text-lg text-center font-semibold w-full'>
					O seu carrinho está vazio 😢
				</div>
			) : (
				<div className='flex gap-9'>
					<ProductsListCart />
					<OrderSummary />
				</div>
			)}
		</div>
	);
}
