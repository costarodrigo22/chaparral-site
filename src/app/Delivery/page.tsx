import DeliveryOrPickupSelector from '@/components/sections/Delivery/DeliveryOrPickupSelector';
import { Button } from '@/components/ui/Button';
// import { Label } from '@/components/ui/Label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Separator } from '@/components/ui/Separator';
import QuantityProvider from '@/contexts/Cart/QuantityContext';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Delivery() {
	// const form = useForm();

	return (
		<QuantityProvider>
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

						<div className='mt-6'>
							<div className='flex items-center gap-4'>
								<div className='w-[50px] h-[70px] bg-slate-100 rounded-sm'></div>

								<div className='flex flex-col gap-2'>
									<span className='text-[#2B0036] font-semibold text-base'>
										ÍAÇA puro 15%
									</span>
									<p className='text-[#1E1E1E] text-[14px]'>1x R$ 30,00</p>
								</div>
							</div>
						</div>

						<div className='mt-6'>
							<div className='flex items-center gap-4'>
								<div className='w-[50px] h-[70px] bg-slate-100 rounded-sm'></div>

								<div className='flex flex-col gap-2'>
									<span className='text-[#2B0036] font-semibold text-base'>
										ÍAÇA puro 15%
									</span>
									<p className='text-[#1E1E1E] text-[14px]'>1x R$ 30,00</p>
								</div>
							</div>
						</div>

						<div className='mt-6'>
							<div className='flex items-center gap-4'>
								<div className='w-[50px] h-[70px] bg-slate-100 rounded-sm'></div>

								<div className='flex flex-col gap-2'>
									<span className='text-[#2B0036] font-semibold text-base'>
										ÍAÇA puro 15%
									</span>
									<p className='text-[#1E1E1E] text-[14px]'>1x R$ 30,00</p>
								</div>
							</div>
						</div>

						<div className='flex justify-between items-center mt-5'>
							<p className='opacity-60 font-medium text-base'>Subtotal</p>
							<p className='font-medium text-base'>R$ 75,00</p>
						</div>

						<Separator className='mt-5' />

						<div className='flex justify-between items-center mt-5'>
							<p className='text-[#1E1E1E] font-medium text-lg'>Total</p>
							<p className='font-semibold text-lg'>R$ 75,00</p>
						</div>

						<Link href='/delivery'>
							<Button className='w-full rounded-full mt-5'>
								Continuar a compra
								<ArrowRight />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</QuantityProvider>
	);
}
