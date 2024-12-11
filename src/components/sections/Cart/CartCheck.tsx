'use client';

import ProductsListCart from './ProductsListCart';
import OrderSummary from './OrderSummary';
import { useCart } from '@/contexts/Cart/CartContext';
import { useAuth } from '@/hooks/useAuth';

export default function CartCheck() {
	const { total } = useCart();

	const { user } = useAuth();

	return (
		<div>
			{total === 0 ? (
				<div className='text-lg flex flex-col font-semibold w-full h-[300px]'>
					<pre>user: {JSON.stringify(user, null, 2)}</pre>

					<h2>O seu carrinho está vazio 😢</h2>
				</div>
			) : (
				<div className='flex gap-9 flex-col lg:flex-row '>
					<ProductsListCart />
					<OrderSummary />
				</div>
			)}
		</div>
	);
}
