import Button from '../components/ui/Button/index';
import Header from '@/components/sections/Header';
import Details from '@/components/sections/Details';
import Products from '@/components/sections/Products';
import OwnProduction from '@/components/sections/OnwProduction';
import Recipes from '@/components/sections/Recipes';
import FoodService from '@/components/sections/FoodService';
import FindUs from '@/components/sections/FindUs';
import api from '@/lib/axiosInstance';

export default async function Home() {
	const [
		resImageHeader,
		imageFoodServiceResponse,
		imageResInstitutional,
		CarrouselInfoRes,
	] = await Promise.all([
		api.get('/api/without/home_header/display_image/featured_image'),
		api.get('/api/without/home_be_a_partner_section/display_image'),
		api.get('/api/without/home_institutional_section/display_image'),
		api.get('/api/without/partners/last_five_partners'),
	]);

	return (
		<div className='w-full h-full'>
			<Header image={resImageHeader?.data} />
			<Details />
			<Products />
			<OwnProduction image={imageResInstitutional?.data} />
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
			<FoodService image={imageFoodServiceResponse.data} />
			<FindUs data={CarrouselInfoRes.data.data} />
		</div>
	);
}
