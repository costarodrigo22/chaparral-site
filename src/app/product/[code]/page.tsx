import FooterProducts from '@/components/sections/Products/components/FooterProducts';
import { Separator } from '@/components/ui/Separator';
import QuantityProvider from '@/contexts/Cart/QuantityContext';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import CartProvider from '@/contexts/Cart/CartContext';

interface IProductProps {
	params: {
		code: string;
	};
}

export default async function Product({ params }: IProductProps) {
	const product = await axios.get(
		`http://192.168.0.191:7010/api/without/omie/consult_product/${params.code}`
	);

	console.log('produto: ', product);

	return (
		<QuantityProvider>
			<CartProvider>
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
						<div className='w-[380px] h-[380px] rounded-sm'>
							<Image
								width={380}
								height={380}
								src={product.data.imagens[0].url_imagem}
								alt='Imagem polpa de açaí'
							/>
						</div>

						<div className='ml-10'>
							<h1 className='text-[#2B0036] text-3xl font-semibold mb-3'>
								{product.data.descricao}
							</h1>
							<h1 className='text-2xl font-semibold'>
								{formatCurrency(product.data.valor_unitario)}
							</h1>

							<div className='mt-5 flex flex-col w-[580px] gap-2'>
								<span className='font-semibold text-lg opacity-60'>
									Descrição do produto:
								</span>

								<span className='text-lg opacity-60'>
									{product.data.descr_detalhada}
								</span>
							</div>

							<Separator className='mb-5 mt-5' />

							<FooterProducts
								code={product.data.codigo_produto}
								nameProduct={product.data.descricao}
								urlImage={product.data.imagens[0].url_imagem}
							/>
						</div>
					</div>
				</div>
			</CartProvider>
		</QuantityProvider>
	);
}
