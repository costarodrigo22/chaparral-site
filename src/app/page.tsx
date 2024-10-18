import Image from 'next/image';
// import ShowProduct from './components/ShowProduct';
import Button from '../components/ui/Button';
// import Header from '@/components/sections/Header';
import Details from '@/components/sections/Details';
import Products from '@/components/sections/Products';
import OwnProduction from '@/components/sections/OnwProduction';
import Recipes from '@/components/sections/Recipes';
import FoodService from '@/components/sections/FoodService';
import FindUs from '@/components/sections/FindUs';
// import Footer from '@/components/sections/Footer';

export default function Home() {
	return (
		<div className='w-full h-full'>
			{/* <Header /> */}
			<Details />
			<Products />
			<OwnProduction />
			{/* <ShowProduct /> */}
			<div className='lg:mx-5 xl:mx-10 mb-10' id='receitas'>
				<div className=' lg:h-[715px]'>
					<Recipes />
				</div>
				<div className='w-full h-auto flex items-center justify-center mt-8'>
					<Button
						text='Veja mais'
						classNameCustom='bg-transparent hover:bg-black/10'
						classNameText='text-black'
						src='/arrow-right-black.svg'
					/>
				</div>
			</div>
			<FoodService />
			<FindUs />
			{/* <div className=' lg:mx-8'>
				<Footer />
			</div> */}
			<div className='w-full h-full relative'>
				<Image
					className='z-50 hover:cursor-pointer right-1 bottom-[25px] fixed animate-shakeWithPause'
					src='/whatsapp-icon.svg'
					alt='Ícone do whatsapp'
					width={70}
					height={70}
				/>
			</div>
		</div>
	);
}
