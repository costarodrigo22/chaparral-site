'use client';

import ToggleQuantity from '@/components/ui/ToggleQuantity';
import { useCart } from '@/contexts/Cart/CartContext';
import { formatCurrency } from '@/lib/utils';
import { deleteItemToCart } from '@/services/cart';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProductsListCart() {
	const [deletingItemCode, setDeletingItemCode] = useState<string | null>(null);

	const { items, updatedCart } = useCart();

	const { mutateAsync } = useMutation({
		mutationFn: deleteItemToCart,
	});

	async function handleDeleteItemToCart(code: string) {
		setDeletingItemCode(code);

		try {
			const result = await mutateAsync(code);

			toast.success(result.message);
		} catch (error) {
			toast.error(`Algo deu errado ao tentar deletar item: ${error}`);
		} finally {
			setDeletingItemCode(null);

			await updatedCart();
		}
	}

	return (
		<div className='lg:w-[60%] w-full rounded-md border p-5 flex flex-col gap-4'>
			{items.map((item) => (
				<div
					key={item.id}
					className='flex justify-between md:flex-row flex-col items-center gap-5 md:items-start md:gap-0'
				>
					<div className='flex'>
						<div className='bg-[#F0F0F0] w-[100px] h-[100px] rounded-sm'>
							<Image
								width={100}
								height={100}
								src={item.product_url_image}
								alt='Foto açaí'
							/>
						</div>

						<div className='flex flex-col ml-4 gap-4'>
							<span className='text-[#2B0036] text-base font-medium'>
								{item.product_name}
							</span>
							<span className='font-semibold text-sm'>
								{formatCurrency(item.product_price)}
							</span>
						</div>
					</div>

					<div className='flex items-end'>
						<ToggleQuantity
							className='w-[120px] h-[40px]'
							initialQuantity={item.product_quantity}
						/>

						{deletingItemCode === item.product_code ? (
							<div className='mb-2 ml-4 flex items-center justify-center'>
								<div className='w-6 h-6 border-2 border-t-[#2E0035] border-[#F0F0F0] rounded-full animate-spin'></div>
							</div>
						) : (
							<Trash2
								color='#FF3333'
								className='mb-2 ml-4 cursor-pointer'
								size={20}
								onClick={() => handleDeleteItemToCart(item.product_code)}
							/>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
