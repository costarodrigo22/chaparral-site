'use client';

import { Button } from '@/components/ui/Button';
import { getAddress } from '@/services/address';
import { useQuery } from '@tanstack/react-query';
import { Home, Map, Plus } from 'lucide-react';
import NewAddress from '../Delivery/NewAddress';
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { httpClient } from '@/lib/httpClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ICardProps {
	id: string;
	cep: string;
	country: string;
	street: string;
	number: number;
	neighborhood: string;
	complement: string;
	city: string;
	state: string;
	uf: string;
	reference: string;
	selected: boolean;
	is_default: boolean;
}

export default function CardAddressSelect() {
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addressDefaut, setAddressDefault] = useState('');

	const route = useRouter();

	const { data, isLoading } = useQuery({
		queryKey: ['listAddress'],
		queryFn: getAddress,
	});

	function handleSetDefaultAddress(id: string) {
		setAddressDefault(id);
	}

	async function handleSelectAddress() {
		setLoading(true);
		try {
			await httpClient.post('/user/address/select', {
				addressId: addressDefaut,
			});

			toast.success('Endereço marcado.');

			route.push('/Delivery');
		} catch (error) {
			toast.error(`Algo deu errado ao marcar o endereço: ${error}`);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		const addressSelected = data?.find(
			(address: ICardProps) => address.selected
		);

		if (addressSelected) {
			setAddressDefault(addressSelected.id);
		}
	}, [data]);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center w-full'>
				<span>carregando...</span>
			</div>
		);
	}

	return (
		<>
			<NewAddress open={openModal} onClose={() => setOpenModal(false)} />

			<div className='flex justify-end items-center  px-0 md:px-10 xl:px-32'>
				<Button
					className='bg-[#E2E8F0] hover:bg-slate-400 transition-all mb-4'
					onClick={() => setOpenModal(true)}
				>
					<Plus className='' color='black' />

					<span className='text-black'>Novo endereço</span>
				</Button>
			</div>
			<div className='flex flex-col px-0 md:px-10 xl:px-32 gap-9'>
				<RadioGroup
					className='ml-8 w-full flex flex-col'
					value={addressDefaut}
					onValueChange={(id) => handleSetDefaultAddress(id)}
				>
					{data.length === 0 && (
						<div className='flex items-center justify-center w-full'>
							<span>Você não tem endereços cadastrados. 😢</span>
						</div>
					)}

					{data.map((address: ICardProps) => (
						<div
							key={address.id}
							className='flex items-center space-x-2 w-full'
						>
							<div className='flex items-center w-full p-6 shadow-sm rounded-md'>
								<RadioGroupItem
									value={address.id}
									id={`option-${address.id}`}
									className='mr-4'
								/>
								{address.is_default && (
									<Home className='mr-6' color='#2B0036' />
								)}

								{!address.is_default && (
									<Map className='mr-6' color='#2B0036' />
								)}

								<div className='w-full flex justify-between items-center'>
									<div className='flex flex-col'>
										<div className='flex gap-2 items-center'>
											<span className='text-[#1E1E1E] text-[16px] font-semibold'>
												{address.street}, {address.number}
											</span>

											{address.is_default && (
												<div className='bg-[#e991ff1a] rounded-full w-[150px] p-[3px] flex items-center justify-center'>
													<p className='text-[#5E14FF] text-[13px] font-medium'>
														Endereço padrão
													</p>
												</div>
											)}
										</div>
										<span className='text-[#1E1E1E] text-[16px] font-normal'>
											{address.cep}, {address.neighborhood}, {address.city} -{' '}
											{address.uf}, {address.complement}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</RadioGroup>
			</div>

			<div className='flex justify-end items-center  px-0 md:px-10 xl:px-32 mt-4'>
				<Button
					disabled={loading}
					className='bg-[#2B0036] hover:bg-[#451b50] transition-all mb-4 rounded-full w-32'
					onClick={handleSelectAddress}
				>
					<span className='text-white'>
						{loading && 'Salvando...'}
						{!loading && 'Salvar'}
					</span>
				</Button>
			</div>
		</>
	);
}
