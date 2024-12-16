'use client';

import ProductsListCart from './ProductsListCart';
import OrderSummary from './OrderSummary';
import { useCart } from '@/contexts/Cart/CartContext';
import logo from '../../../../public/logo-iaca-purple.svg';
import Image from 'next/image';
import { useEffect } from 'react';

export default function CartCheck() {
	const { quantityItemCart, loadingCart, updatedCart } = useCart();

	useEffect(() => {
		updatedCart();
	}, [updatedCart]);

	if (loadingCart) {
		return (
			<div className='flex flex-col items-center justify-center w-full'>
				<Image src={logo} alt='Iaça logo' />
				<span className='text-[#320e3a]'>carregando carrinho Íaça...</span>
			</div>
		);
	}

	return (
		<div>
			{quantityItemCart === 0 ? (
				<div className='text-lg flex items-center justify-center flex-col font-semibold w-full h-[300px]'>
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
