'use client';

import { useEffect, useState } from 'react';
import ProductsListCart from './ProductsListCart';
import OrderSummary from './OrderSummary';

export default function CartCheck() {
	const [isCartEmpty, setIsCartEmpty] = useState(true);

	useEffect(() => {
		const product = localStorage.getItem('cart');
		let isEmpty = true;

		try {
			const productLocalStorageParse = product ? JSON.parse(product) : null;
			if (productLocalStorageParse?.param?.[0]?.itens?.[0]) {
				isEmpty = false;
			}
		} catch (error) {
			console.error("Erro ao parsear dados do 'cart' do localStorage:", error);
		}

		setIsCartEmpty(isEmpty);
	}, []);

	return (
		<div>
			{isCartEmpty ? (
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
