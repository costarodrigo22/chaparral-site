'use client';
import api from '@/lib/axiosInstance';
// import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import headerLogo from '../../../../public/header-pix.svg';
import { Separator } from '@/components/ui/Separator';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/Button';

interface IPixPageProps {
  params: {
    id: string;
  };
}

interface IPixProps {
  cCopiaCola: string;
  cQrCode: string;
}

export default function PixPage({ params }: IPixPageProps) {
  const [pixData, setPixData] = useState<IPixProps | null>(null);
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // const orderNumber = searchParams.get('order_number');
  // const codeOrder = searchParams.get('code_order');
  const getPixData = useCallback(async () => {
    try {
      const { data } = await api.get<IPixProps>(
        `/api/without/omie/consult_pix/${params.id}`
      );
      setPixData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [params.id]);

  useEffect(() => {
    getPixData();
  }, [getPixData]);

  // function handleNavigation() {
  //   router.push(`/TrackOrder/${orderNumber}/${codeOrder}`);
  // }

  async function handleCopyValuePix() {
    try {
      if (!navigator.clipboard) {
        toast.error(
          'A funcionalidade de copiar não está disponível neste navegador.'
        );
        return;
      }

      const pixValue = pixData?.cCopiaCola || '';
      if (!pixValue) {
        toast.warning('Não há chave Pix para copiar.');
        return;
      }

      await navigator.clipboard.writeText(pixValue);
      toast.success('Chave Pix copiada com sucesso!');
    } catch (error) {
      console.error('Erro ao copiar chave Pix:', error);
      toast.error('Algo deu errado ao tentar copiar a chave Pix!');
    }
  }

  return (
    <div className="pt-[100px] pb-5 flex w-full  h-auto items-center justify-center">
      <div className="flex w-full sm:w-[70%] h-auto flex-col items-center justify-center">
        <Image src={headerLogo} alt="logo pix" />
        <span className="text-[#2B0036] font-semibold text-base">
          Aguardando confirmação de pagamento
        </span>
        <Separator />
        <span className="text-center text-[#1E1E1E] text-[15px]">
          Abra seu aplicativo de pagamento, escolha a opção de pagamento por QR
          Code e scaneie o QR Code
        </span>
        <div className="w-full bg-[#F7F7F7] items-center justify-center rounded-sm flex flex-col py-4">
          <Image
            src={`data:image/png;base64,${pixData?.cQrCode}`}
            alt="QR code"
            width={300}
            height={300}
            priority
          />

          <span className="text-center font-semibold text-[12px] text-[#1E1E1E] p-6">
            Antes de confirmar seu pagamento, verifique se está enviando para a
            IAÇA Puro e que o processamento está sendo feito para a instituição
            Omie Cash. Agradecemos pela sua atenção!
          </span>
        </div>
        <span className="text-[#1E1E1E] text-[13px] text-center">
          Se preferir, copie o código abaixo e utilize a opção copie e cola no
          aplicativo do seu banco para concluir o pagamento.
        </span>
        <div className="w-full py-4 bg-[#F7F7F7] flex flex-col items-center justify-center rounded-sm px-4">
          <div className="bg-white w-full p-3 rounded-md flex">
            <span className="text-[#898989] text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">
              {pixData?.cCopiaCola}
            </span>

            <div
              className="flex items-center gap-1 ml-1 cursor-pointer hover:underline"
              onClick={handleCopyValuePix}
            >
              <span className="text-[#5E14FF] text-[13px] font-normal">
                Copiar
              </span>

              <Copy color="#5E14FF" size={10} />
            </div>
          </div>

          <span className="text-center text-[13px] mt-2">
            Antes de confirmar seu pagamento, verifique se está enviando para a
            IAÇA Puro e que o processamento está sendo feito para a instituição
            Omie Cash. Agradecemos pela sua atenção!
          </span>
        </div>

        {/* <div className="w-full flex justify-center items-center">
        <Button
          onClick={handleNavigation}
          className="bg-[#2B0036] w-full sm:w-1/4 rounded-full my-5 hover:bg-[#5a3663]"
        >
          Acompanhar pedido
        </Button>
      </div> */}
      </div>
    </div>
  );
}
