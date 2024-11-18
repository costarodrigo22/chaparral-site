import DetailsSummary from '@/components/sections/Delivery/DetailsSummary';
import DeliveryOrSiteSelector from '@/components/sections/Payments/DeliveryOrSiteSelector';
import EnableButton from '@/components/sections/Payments/EnabledButton';
import { Separator } from '@/components/ui/Separator';
import CartProvider from '@/contexts/Cart/CartContext';
import QuantityProvider from '@/contexts/Cart/QuantityContext';
import { PaymentSelectionProvider } from '@/contexts/Payment/PaymentContext';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Payment() {
	return (
		<PaymentSelectionProvider>
			<QuantityProvider>
				<CartProvider>
					<div className='flex flex-col w-full mb-10'>
						<div className='flex justify-between items-center w-full mt-28 px-32 mb-10'>
							<span className='text-2xl font-bold'>
								Como deseja pagar o produto?
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
								<DeliveryOrSiteSelector />
							</div>

							<div className='w-1/3 rounded-md border p-5'>
								<span className='text-[#1E1E1E] text-2xl font-semibold'>
									Resumo do Pedido
								</span>

								<Separator className='mt-5' />

								<DetailsSummary />

								<EnableButton />
							</div>
						</div>
					</div>
				</CartProvider>
			</QuantityProvider>
		</PaymentSelectionProvider>
	);
}
