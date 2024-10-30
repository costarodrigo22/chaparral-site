import BuyModalTrigger from '@/components/sections/Delivery/BuyModalTrigger';
import { Separator } from '@/components/ui/Separator';
import ToggleQuantity from '@/components/ui/ToggleQuantity';
import QuantityProvider from '@/contexts/Cart/QuantityContext';
import { ChevronRight, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
	return (
		<QuantityProvider>
			<div className='flex flex-col w-full mb-10'>
				<div className='flex justify-between items-center w-full mt-28 px-32 mb-10'>
					<span className='text-2xl font-bold'>Meu carrinho</span>

					<Link
						href='/'
						className='text-[#2B0036] text-base font-medium flex hover:underline cursor-pointer'
					>
						Voltar ao início
						<ChevronRight />
					</Link>
				</div>

				<div className='flex px-32 gap-9'>
					<div className='w-2/3 rounded-md border p-5 flex flex-col gap-5'>
						<div className='flex justify-between'>
							<div className='flex'>
								<div className='bg-[#F0F0F0] w-[100px] h-[100px] rounded-sm'></div>

								<div className='flex flex-col ml-4 gap-4'>
									<span className='text-[#2B0036] text-base font-medium'>
										ÍAÇA puro 15%
									</span>
									<span className='font-semibold text-sm'>R$ 30,00</span>
								</div>
							</div>

							<div className='flex items-end'>
								<ToggleQuantity className='w-[120px] h-[40px]' />

								<Trash2
									color='#FF3333'
									className='mb-2 ml-4 cursor-pointer'
									size={20}
								/>
							</div>
						</div>

						<Separator className='' />

						<div className='flex justify-between'>
							<div className='flex'>
								<div className='bg-[#F0F0F0] w-[100px] h-[100px] rounded-sm'></div>

								<div className='flex flex-col ml-4 gap-4'>
									<span className='text-[#2B0036] text-base font-medium'>
										ÍAÇA puro 15%
									</span>
									<span className='font-semibold text-sm'>R$ 30,00</span>
								</div>
							</div>

							<div className='flex items-end'>
								<ToggleQuantity className='w-[120px] h-[40px]' />

								<Trash2
									color='#FF3333'
									className='mb-2 ml-4 cursor-pointer'
									size={20}
								/>
							</div>
						</div>

						<Separator className='' />

						<div className='flex justify-between'>
							<div className='flex'>
								<div className='bg-[#F0F0F0] w-[100px] h-[100px] rounded-sm'></div>

								<div className='flex flex-col ml-4 gap-4'>
									<span className='text-[#2B0036] text-base font-medium'>
										ÍAÇA puro 15%
									</span>
									<span className='font-semibold text-sm'>R$ 30,00</span>
								</div>
							</div>

							<div className='flex items-end'>
								<ToggleQuantity className='w-[120px] h-[40px]' />

								<Trash2
									color='#FF3333'
									className='mb-2 ml-4 cursor-pointer'
									size={20}
								/>
							</div>
						</div>

						<Separator className='' />
					</div>

					<div className='w-1/3 rounded-md border p-5'>
						<span className='text-[#1E1E1E] text-2xl font-semibold'>
							Resumo do Pedido
						</span>

						<div className='flex justify-between items-center mt-5'>
							<p className='opacity-60 font-medium text-base'>Subtotal</p>
							<p className='font-medium text-base'>R$ 75,00</p>
						</div>

						<Separator className='mt-5' />

						<div className='flex justify-between items-center mt-5'>
							<p className='text-[#1E1E1E] font-medium text-lg'>Total</p>
							<p className='font-semibold text-lg'>R$ 75,00</p>
						</div>

						<BuyModalTrigger />
					</div>
				</div>
			</div>
		</QuantityProvider>
	);
}
