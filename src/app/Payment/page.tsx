import DetailsSummary from '@/components/sections/Delivery/DetailsSummary';
import DeliveryOrSiteSelector from '@/components/sections/Payments/DeliveryOrSiteSelector';
import EnableButton from '@/components/sections/Payments/EnabledButton';
import { Separator } from '@/components/ui/Separator';
import { PaymentSelectionProvider } from '@/contexts/Payment/PaymentContext';
import { ChevronRight } from 'lucide-react';

export default function Payment() {
	return (
		<PaymentSelectionProvider>
			<div className='flex flex-col w-full mb-10'>
				<div className='flex justify-between items-center w-full mt-28 px-0 md:px-10 xl:px-32 mb-10'>
					<span className='text-base md:text-xl lg:text-2xl font-bold'>
						Como deseja pagar o produto?
					</span>

					<a
						href='/'
						className='text-[#2B0036] items-center text-xs lg:text-base font-medium flex hover:underline cursor-pointer'
					>
						<span>Voltar ao início</span>
						<ChevronRight />
					</a>
				</div>

				<div className='flex flex-col lg:flex-row px-0 md:px-10 xl:px-32 gap-9'>
					<div className='w-full p-5 flex flex-col'>
						<DeliveryOrSiteSelector />
					</div>

					<div className='w-full rounded-md border p-5'>
						<span className='text-[#1E1E1E] text-2xl font-semibold'>
							Resumo do Pedido
						</span>

						<Separator className='mt-5' />

						<DetailsSummary />

						<EnableButton />
					</div>
				</div>
			</div>
		</PaymentSelectionProvider>
	);
}
