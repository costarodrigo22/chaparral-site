'use client';

import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { useState } from 'react';

import Image from 'next/image';
import logoPix from '../../../../public/pix.svg';
import logoCard from '../../../../public/card.svg';
import { cn } from '@/lib/utils';
import { usePaymentSelection } from '@/hooks/useSelectionPayment';
import ModalConfirmOrder from './ModalConfirmOrder';

export default function DeliveryOrSiteSelector() {
	const [selection, setSelection] = useState('');

	const {
		selection: selectionType,
		openModalConfirmOrder,
		handleCloseModalConfirmOrder,
		setSelection: setSelectionType,
	} = usePaymentSelection();

	function handleToggleTypePaymentPixSite() {
		setSelectionType('PixSite');
	}

	function handleToggleTypePaymentPixDelivery() {
		setSelectionType('PixDelivery');
	}

	function handleToggleTypePaymentCardDelivery() {
		setSelectionType('CardDelivery');
	}

	return (
		<>
			<ModalConfirmOrder
				open={openModalConfirmOrder}
				onClose={handleCloseModalConfirmOrder}
			/>

			<div className='flex'>
				<div className='w-full'>
					<RadioGroup
						className='flex flex-col space-y-1'
						onValueChange={(value) => setSelection(value)}
					>
						<div
							className='rounded-md border p-5'
							onClick={handleToggleTypePaymentPixSite}
						>
							<RadioGroupItem value='Entrega' id='option-one' />
							<Label
								className='ml-2 text-base font-medium'
								htmlFor='option-one'
							>
								Pagar pelo site
							</Label>
							{selection === 'Entrega' && (
								<div className='w-full px-6 py-4'>
									<div
										className={cn(
											'flex items-center gap-4 border border-[#898989] rounded-lg w-[420px] p-5 cursor-pointer',
											selectionType === 'PixSite' && 'border-[#00E19D]'
										)}
									>
										<Image src={logoPix} alt='logo pix' />

										<div className='flex flex-col'>
											<span className='font-semibold text-base'>Pix</span>
											<span className='text-sm text-[#898989]'>
												Utilize o QR code ou copie e cole o código
											</span>
										</div>
									</div>
								</div>
							)}
						</div>

						<div className='rounded-md border p-5'>
							<RadioGroupItem value='Retirada' id='option-two' />
							<Label
								className='ml-2 text-base font-medium'
								htmlFor='option-two'
							>
								Pagar na entrega
							</Label>
							<div>
								{selection === 'Retirada' && (
									<div className='flex flex-col gap-4 w-full px-6 py-4'>
										<div
											className={cn(
												'flex items-center gap-4 border border-[#898989] rounded-lg w-[420px] p-5 cursor-pointer',
												selectionType === 'PixDelivery' && 'border-[#00E19D]'
											)}
											onClick={handleToggleTypePaymentPixDelivery}
										>
											<Image src={logoPix} alt='logo pix' />

											<div className='flex flex-col'>
												<span className='font-semibold text-base'>Pix</span>
												<span className='text-sm text-[#898989]'>
													Utilize o QR code ou copie e cole o código
												</span>
											</div>
										</div>

										<div
											className={cn(
												'flex items-center gap-4 border border-[#898989] rounded-lg w-[420px] p-5 cursor-pointer',
												selectionType === 'CardDelivery' && 'border-[#00E19D]'
											)}
											onClick={handleToggleTypePaymentCardDelivery}
										>
											<Image src={logoCard} alt='logo pix' />

											<div className='flex flex-col'>
												<span className='font-semibold text-base'>Cartão</span>
												<span className='text-sm text-[#898989]'>
													Utilize o QR code ou copie e cole o código
												</span>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</RadioGroup>
				</div>
			</div>
		</>
	);
}
