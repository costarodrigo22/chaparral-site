'use client';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import Image from 'next/image';
import headerLogo from '../../../../public/header-pix.svg';
import { Separator } from '@/components/ui/Separator';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface IModalPixProps {
	open: boolean;
	pix_copy_paste: string;
	qd_code: string;
	onClose: () => void;
}

export default function ModalPix({
	open,
	pix_copy_paste,
	qd_code,
	onClose,
}: IModalPixProps) {
	async function handleCopyValuePix() {
		try {
			await navigator.clipboard.writeText(pix_copy_paste);

			toast.success('Chave pix copiada com sucesso!');
		} catch (error) {
			toast.error('Alto deu errado ao tentar copiar a chave pix!');
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-[480px] p-5 flex justify-center flex-col items-center'>
				<Image src={headerLogo} alt='logo pix' />
				<span className='text-[#2B0036] font-semibold text-sm'>
					Aguardando confirmação de pagamento
				</span>
				<Separator />
				<span className='text-center text-[#1E1E1E] text-[13px]'>
					Abra seu aplicativo de pagamento, escolha a opção de pagamento por QR
					Code e scaneie o QR Code
				</span>
				<div className='w-full bg-[#F7F7F7] items-center justify-center rounded-sm flex flex-col py-4'>
					<Image
						src={`data:image/png;base64,${qd_code}`}
						alt='QR code'
						width={135}
						height={135}
						priority
					/>

					<span className='text-center font-semibold text-[10px] text-[#1E1E1E] p-6'>
						Antes de confirmar seu pagamento, verifique se está enviando para a
						IAÇA Puro e que o processamento está sendo feito para a instituição
						Omie Cash. Agradecemos pela sua atenção!
					</span>
				</div>

				<span className='text-[#1E1E1E] text-[11px] text-center'>
					Se preferir, copie o código abaixo e utilize a opção copie e cola no
					aplicativo du seu banco para concluir o pagamento.
				</span>

				<div className='w-full py-4 bg-[#F7F7F7] flex flex-col items-center justify-center rounded-sm px-4'>
					<div className='bg-white w-full p-3 rounded-md flex'>
						<span className='text-[#898989] text-[11px] overflow-hidden text-ellipsis whitespace-nowrap'>
							{pix_copy_paste}
						</span>

						<div
							className='flex items-center gap-1 ml-1 cursor-pointer hover:underline'
							onClick={handleCopyValuePix}
						>
							<span className='text-[#5E14FF] text-[11px] font-normal'>
								Copiar
							</span>

							<Copy color='#5E14FF' size={10} />
						</div>
					</div>

					<span className='text-center text-[11px] mt-2'>
						Antes de confirmar seu pagamento, verifique se está enviando para a
						IAÇA Puro e que o processamento está sendo feito para a instituição
						Omie Cash. Agradecemos pela sua atenção!
					</span>
				</div>
			</DialogContent>
		</Dialog>
	);
}
