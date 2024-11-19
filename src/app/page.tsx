// import ShowProduct from './components/ShowProduct';
import Button from '../components/ui/Button/index';
import Header from '@/components/sections/Header';
import Details from '@/components/sections/Details';
import Products from '@/components/sections/Products';
import OwnProduction, {
  ApiResponse,
} from '@/components/sections/OnwProduction';
import Recipes from '@/components/sections/Recipes';
import FoodService from '@/components/sections/FoodService';
import FindUs from '@/components/sections/FindUs';
import CartProvider from '@/contexts/Cart/CartContext';
import api from '@/lib/axiosInstance';
import WhatsAppBtn from '@/components/ui/WhatsAppBtn';
// import Footer from '@/components/sections/Footer';

export default async function Home() {
  const res = await api.get('/api/without/company_profile/get');
  const resImageHeader = await api.get(
    '/api/without/home_header/display_image/featured_image'
  );
  const infoResInstitutional = await api.get<ApiResponse>(
    '/api/without/home_institutional_section/index'
  );
  const imageResInstitutional = await api.get(
    '/api/without/home_institutional_section/display_image'
  );
  return (
    <CartProvider>
      <div className="w-full h-full">
        <Header image={resImageHeader?.data} />
        <Details />
        <Products />
        <OwnProduction
          info={infoResInstitutional?.data.data[0]}
          image={imageResInstitutional?.data}
        />
        {/* <ShowProduct /> */}
        <div className="lg:mx-5 xl:mx-10 mb-10" id="receitas">
          <div className=" lg:h-[715px]">
            <Recipes />
          </div>
          <div className="w-full h-auto flex items-center justify-center mt-8">
            <Button
              text="Veja mais"
              classNameCustom="bg-transparent hover:bg-black/10"
              classNameText="text-black"
              src="/arrow-right-black.svg"
            />
          </div>
        </div>
        <FoodService />
        <FindUs />
        {/* <div className=' lg:mx-8'>
					<Footer />
				</div> */}
        <WhatsAppBtn link={res?.data?.data?.whatsapp} />
      </div>
    </CartProvider>
  );
}
