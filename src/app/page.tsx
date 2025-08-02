/* eslint-disable @next/next/no-async-client-component */
'use client';

// import Button from '../components/ui/Button/index';
// import Header from '@/components/sections/Header';
// import Details from '@/components/sections/Details';
// import Products from '@/components/sections/Products';
// import OwnProduction from '@/components/sections/OnwProduction';
// import Recipes from '@/components/sections/Recipes';
// import FoodService from '@/components/sections/FoodService';
// import FindUs from '@/components/sections/FindUs';
// import api from '@/lib/axiosInstance';

import Image from 'next/image';
import InstaLogo from '../../public/instagram-logo.svg';
import faceLogo from '../../public/facebook-logo.svg';
import notContent from '../../public/image-not-content.svg';

export default async function Home() {
	// const [
	// 	resImageHeader,
	// 	imageFoodServiceResponse,
	// 	imageResInstitutional,
	// 	CarrouselInfoRes,
	// ] = await Promise.all([
	// 	api.get('/api/without/home_header/display_image/featured_image'),
	// 	api.get('/api/without/home_be_a_partner_section/display_image'),
	// 	api.get('/api/without/home_institutional_section/display_image'),
	// 	api.get('/api/without/partners/last_five_partners'),
	// ]);

	return (
		<div className='w-full h-screen flex flex-col justify-between'>
			<div className='flex items-center justify-center h-full'>
				<div className='flex gap-14'>
					<Image src={notContent} alt='Not Content' width={150} height={150} />

					<div className='flex flex-col gap-4'>
						<span className='text-[#2B0036] font-bold text-2xl'>
							Site em manutenção!{' '}
						</span>

						<div className='flex flex-col'>
							<span className='italic'>
								Estamos preparando uma experiência ainda melhor para você!
							</span>

							<span>
								Voltamos em breve com toda a energia e sabor que só o{' '}
								<span className='text-[#2B0036] font-semibold'>Íaça</span> tem.
							</span>
						</div>
						<span className='font-medium'>
							Agradecemos a sua compreensão! 💜
						</span>
					</div>
				</div>
			</div>

			<div className='w-full h-[280px] flex items-center justify-center px-10'>
				<div className='bg-[#FDECE5] w-full h-full rounded-t-3xl flex items-start'>
					<div className='flex flex-col gap-4 px-12 py-8'>
						<span className='text-[#5B5B5B] text-base font-medium'>
							Tem alguma dúvida?
						</span>
						<span className='text-[#5B5B5B] text-base font-medium'>
							Nossa equipe está aqui para te atender :)
						</span>

						<button className='bg-darkPurple text-white rounded-full px-6 py-2 transition-colors font-medium w-[160px] h-[50px]'>
							Contato
						</button>

						<span className='text-[#5B5B5B] text-base font-medium'>
							Siga nossas redes sociais:
						</span>

						<div className='flex gap-6 items-center'>
							<Image
								alt='logo instagram'
								src={InstaLogo}
								onClick={() => {
									window.open(
										'https://www.instagram.com/iacapuro?igsh=MWE1MnFka254MGVvdA==',
										'_blank'
									);
								}}
								height={25}
								width={27}
								className='hover:cursor-pointer'
							/>
							<Image
								alt='logo facebook'
								src={faceLogo}
								// onClick={() => {
								// 	window.open(company.facebook, '_blank');
								// }}
								className='hover:cursor-pointer'
								height={25}
								width={27}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* <Header image={resImageHeader?.data} />
			<Details />
			<Products />
			<OwnProduction image={imageResInstitutional?.data} /> */}
			{/* <div className='lg:mx-5 xl:mx-10 mb-10' id='receitas'> */}
			{/* <div className=' lg:h-[715px]'>
					<Recipes />
				</div> */}
			{/* <div className='w-full h-auto flex items-center justify-center mt-8'>
					<Button
						text='Veja mais'
						classNameCustom='bg-transparent hover:bg-black/10'
						classNameText='text-black'
						src='/arrow-right-black.svg'
					/>
				</div> */}
			{/* </div> */}
			{/* <FoodService image={imageFoodServiceResponse.data} />
			<FindUs data={CarrouselInfoRes.data.data} /> */}
		</div>
	);
}
