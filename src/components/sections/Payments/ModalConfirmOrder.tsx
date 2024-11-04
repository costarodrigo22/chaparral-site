'use client';

import {
	Dialog,
	DialogContent,
	// DialogDescription,
	// DialogHeader,
	// DialogTitle,
} from '@/components/ui/Dialog';
import { House, ThumbsUp } from 'lucide-react';
import logoPix from '../../../../public/pix.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface IModalConfirmOrder {
	open: boolean;
	onClose: () => void;
}

export default function ModalConfirmOrder({
	open,
	onClose,
}: IModalConfirmOrder) {
	return (
		<>
			<Dialog open={open} onOpenChange={onClose}>
				<DialogContent className='w-[550px] p-5'>
					<span>Confirme a retirada do produto</span>

					<div>
						<span className='text-[#898989] text-xs'>Retirar em:</span>
						<div className='flex border p-5 items-center rounded-lg gap-4 mb-4'>
							<House />

							<div className='flex flex-col gap-2'>
								<span className='font-semibold text-sm'>
									ÍAÇA - Fuji Motors{' '}
								</span>
								<span className='text-[#898989] text-sm'>
									BR-010, S/N - Km 1361
								</span>
							</div>
						</div>
						<span className='text-[#898989] text-xs'>Retirar em:</span>
						<div className='flex border p-5 items-center rounded-lg gap-4'>
							<Image src={logoPix} alt='logo pix' />

							<div className='flex flex-col gap-2'>
								<span className='font-semibold text-sm'>Pix</span>
								<span className='text-[#898989] text-sm'>
									Utilize o QR code ou copie e cole o código
								</span>
							</div>
						</div>

						<Button className='bg-[#2B0036] w-full h-14 rounded-full mt-5 hover:bg-[#5a3663]'>
							Confirmar e gerar pedido
							<ThumbsUp />
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
