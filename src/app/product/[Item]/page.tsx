import FooterProducts from '@/components/sections/Products/components/FooterProducts';
import { Separator } from '@/components/ui/Separator';
import QuantityProvider from '@/contexts/Cart/QuantityContext';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface IProductProps {
	params: {
		Item: string;
	};
}

export default function Product({ params }: IProductProps) {
	console.log(params);

	return (
		<QuantityProvider>
			<div className='flex flex-col w-full mb-10'>
				<div className='flex justify-between items-center w-full mt-28 px-32 mb-10'>
					<span className='text-2xl font-bold'>Detalhes do produto</span>

					<Link
						href='/'
						className='text-[#2B0036] text-base font-medium flex hover:underline cursor-pointer'
					>
						Voltar ao início
						<ChevronRight />
					</Link>
				</div>

				<div className='flex px-32'>
					<div className='bg-[#F0F0F0] w-[380px] h-[380px] rounded-sm'></div>

					<div className='ml-10'>
						<h1 className='text-[#2B0036] text-3xl font-semibold mb-3'>
							Íaça Puro 15% - 1Kg
						</h1>
						<h1 className='text-2xl font-semibold'>R$ 260,00</h1>

						<div className='mt-5 flex flex-col w-[580px] gap-2'>
							<span className='font-semibold text-lg opacity-60'>
								Descrição do produto:
							</span>

							<span className='text-lg opacity-60'>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry standard dummy text
								ever since the 1500s, when an unknown printer took a galley of
								type and scrambled it to make a type specimen book.
							</span>
						</div>

						<Separator className='mb-5 mt-5' />

						<FooterProducts />
					</div>
				</div>
			</div>
		</QuantityProvider>
	);
}
