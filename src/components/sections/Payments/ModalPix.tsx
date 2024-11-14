'use client';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import Image from 'next/image';
import headerLogo from '../../../../public/header-pix.svg';
import { Separator } from '@/components/ui/Separator';

interface IModalPixProps {
	open: boolean;
	onClose: () => void;
}

export default function ModalPix({ open, onClose }: IModalPixProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-[450px] p-5 flex justify-center flex-col items-center'>
				<Image src={headerLogo} alt='logo pix' />
				<span className='text-[#2B0036] font-semibold text-sm'>
					Aguardando confirmação de pagamento
				</span>

				<Separator />

				<span className='text-center text-[#1E1E1E] text-[13px]'>
					Abra seu aplicativo de pagamento, escolha a opção de pagamento por QR
					Code e scaneie o QR Code
				</span>

				<div className='w-full h-[240px] bg-[#F7F7F7] flex items-center justify-center rounded-sm'>
					<span className='text-center font-semibold text-[10px] text-[#1E1E1E] p-6'>
						Antes de confirmar seu pagamento, verifique se está enviando para a
						IAÇA Puro e que o processamento está sendo feito para a instituição
						Omie Cash. Agradecemos pela sua atenção!
					</span>
				</div>
			</DialogContent>
		</Dialog>
	);
}
