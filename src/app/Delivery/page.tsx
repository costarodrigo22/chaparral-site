import DeliveryOrPickupSelector from '@/components/sections/Delivery/DeliveryOrPickupSelector';
import DetailsSummary from '@/components/sections/Delivery/DetailsSummary';
import { Separator } from '@/components/ui/Separator';
import CartProvider from '@/contexts/Cart/CartContext';
import QuantityProvider from '@/contexts/Cart/QuantityContext';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Delivery() {
	return (
		<QuantityProvider>
			<CartProvider>
				<div className='flex flex-col w-full mb-10'>
					<div className='flex justify-between items-center w-full mt-28 px-32 mb-10'>
						<span className='text-2xl font-bold'>
							Como quer receber o produto?
						</span>

						<Link
							href='/'
							className='text-[#2B0036] text-base font-medium flex hover:underline cursor-pointer'
						>
							Voltar ao início
							<ChevronRight />
						</Link>
					</div>

					<div className='flex px-32 gap-9'>
						<div className='w-2/3  p-5 flex flex-col'>
							<DeliveryOrPickupSelector />
						</div>

						<div className='w-1/3 rounded-md border p-5'>
							<span className='text-[#1E1E1E] text-2xl font-semibold'>
								Resumo do Pedido
							</span>

							<Separator className='mt-5' />

							<DetailsSummary btnConfirm />
						</div>
					</div>
				</div>
			</CartProvider>
		</QuantityProvider>
	);
}
