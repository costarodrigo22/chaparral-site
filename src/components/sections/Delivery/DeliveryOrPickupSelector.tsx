'use client';

import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Separator } from '@/components/ui/Separator';
import { useState } from 'react';
import UpdateAddress from './UpdateAddress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { House, MapPin, Phone, Timer } from 'lucide-react';

export default function DeliveryOrPickupSelector() {
	const [selection, setSelection] = useState('');
	const [localPickUp, setLocalPickUp] = useState('');
	const [openModalUpdateAddress, setOpenModalUpdateAddress] = useState(false);

	function handleCloseModalUpdateAddress() {
		setOpenModalUpdateAddress(false);
	}

	function handleOpenModalUpdateAddress() {
		setOpenModalUpdateAddress(true);
	}

	function handleSelectLocalPickUpChange(value: string) {
		console.log(value);

		setLocalPickUp(value);
	}

	return (
		<>
			<UpdateAddress
				open={openModalUpdateAddress}
				onClose={handleCloseModalUpdateAddress}
			/>

			<div className='flex'>
				<div className='w-full'>
					<RadioGroup
						className='flex flex-col space-y-1'
						onValueChange={(value) => setSelection(value)}
					>
						<div className='rounded-md border p-5'>
							<RadioGroupItem value='Entrega' id='option-one' />
							<Label
								className='ml-2 text-base font-medium'
								htmlFor='option-one'
							>
								Entrega
							</Label>
							{selection === 'Entrega' && (
								<div className='w-full px-10 py-4'>
									<span>
										Rua 15 de novembro, 35, Vila nova, Imperatriz, Maranhão Ao
										lado do supermercado
									</span>

									<Separator className='my-4' />

									<span
										onClick={handleOpenModalUpdateAddress}
										className='text-[#16A6FF] text-base cursor-pointer hover:underline transition-all'
									>
										Atualizar endereço
									</span>
								</div>
							)}
						</div>

						<div className='rounded-md border p-5'>
							<RadioGroupItem value='Retirada' id='option-two' />
							<Label
								className='ml-2 text-base font-medium'
								htmlFor='option-two'
							>
								Retirada
							</Label>
							<div>
								{selection === 'Retirada' && (
									<div className='w-full py-4'>
										<Label className='text-base font-medium'>
											Retire seu produto na loja*
										</Label>
										<Select
											value={localPickUp}
											onValueChange={handleSelectLocalPickUpChange}
										>
											<SelectTrigger className='' id='type-profile'>
												<SelectValue placeholder='Selecione' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Fuji'>Fuji</SelectItem>
												<SelectItem value='Casa do morango'>
													Casa do morango
												</SelectItem>
											</SelectContent>
										</Select>

										<div className='mt-5 flex flex-col gap-2'>
											<div className='flex items-center gap-2'>
												<House size={22} />

												<span className='text-base font-medium'>
													ÍAÇA - Fuji Motors
												</span>
											</div>

											<div className='flex items-center gap-2'>
												<MapPin color='#898989' size={22} />

												<span className='text-[12px] text-[#898989]'>
													BR-010, S/N - Km 1361
												</span>
											</div>

											<div className='flex items-center gap-2'>
												<Phone color='#898989' size={22} />

												<span className='text-[12px] text-[#898989]'>
													(99) 3321-1150
												</span>
											</div>

											<div className='flex items-center gap-2'>
												<Timer color='#898989' size={22} />

												<span className='text-[12px] text-[#898989]'>
													Seg a Sex 08:00 às 18:00, Sáb 08:00 às 12:00 e Dom
													Fechada
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
