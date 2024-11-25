import FooterProducts from '@/components/sections/Products/components/FooterProducts';
import { Separator } from '@/components/ui/Separator';
import QuantityProvider from '@/contexts/Cart/QuantityContext';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import CartProvider from '@/contexts/Cart/CartContext';
import api from '@/lib/axiosInstance';

interface IProductProps {
  params: {
    code: string;
  };
}

export default async function Product({ params }: IProductProps) {
  const product = await api.get(
    `/api/without/omie/consult_product/${params.code}`
  );

  return (
    <QuantityProvider>
      <CartProvider>
        <div className="flex flex-col w-full mb-10">
          <div className="flex px-2 justify-between items-center w-full mt-28 md:px-16 xl:px-32 mb-10">
            <span className=" text-lg xl:text-2xl font-bold">
              Detalhes do produto
            </span>

            <a
              href="/"
              className="text-[#2B0036] text-sm items-center xl:text-base font-medium flex hover:underline cursor-pointer"
            >
              Voltar ao início
              <ChevronRight />
            </a>
          </div>

          <div className="flex px-5 xl:px-32 lg:flex-row flex-col">
            <div className="w-full xl:w-auto xl:block rounded-sm flex items-center justify-center my-5">
              <Image
                width={380}
                height={380}
                src={product.data.imagens[0].url_imagem}
                alt="Imagem polpa de açaí"
              />
            </div>

            <div className="md:ml-10">
              <h1 className="text-[#2B0036] text-xl xl:text-3xl font-semibold mb-3">
                {product.data.descricao}
              </h1>
              <h1 className="xl:text-2xl text-lg font-semibold">
                {formatCurrency(product.data.valor_unitario)}
              </h1>

              <div className="mt-5 flex flex-col md:w-[580px] gap-2">
                <span className="font-semibold xl:text-lg text-base opacity-60">
                  Descrição do produto:
                </span>

                <span className="xl:text-lg text-base opacity-60">
                  {product.data.descr_detalhada}
                </span>
              </div>

              <Separator className="mb-5 mt-5" />

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
