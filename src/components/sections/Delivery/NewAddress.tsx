'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import { toast } from 'sonner';
import { addAddress, getAddress, selectAddress } from '@/services/address';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Home } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { httpClient } from '@/lib/httpClient';
import api from '@/lib/axiosInstance';
import { unformatCPF } from '@/lib/utils';

interface IModalUpdateAddress {
	open: boolean;
	onClose: () => void;
}

const schema = z.object({
	addressStep: z.object({
		cep: z.string().min(1, 'CEP é obrigatório!'),
		country: z.string().min(1, 'País é obrigatório!'),
		street: z.string().min(1, 'Rua é obrigatório!'),
		number: z.string().min(1, 'Número é obrigatório!'),
		neighborhood: z.string().min(1, 'Bairro é obrigatório!'),
		complement: z.string(),
		city: z.string().min(1, 'Cidade é obrigatório!'),
		state: z.string().min(1, 'Estado é obrigatório!'),
		uf: z.string().min(1, 'UF é obrigatório!'),
		reference: z.string(),
	}),
});

type FormData = z.infer<typeof schema>;

export default function NewAddress({ open, onClose }: IModalUpdateAddress) {
	const [addressDefaut, setAddressDefault] = useState('');

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			addressStep: {
				cep: '',
				country: 'Brasil',
				street: '',
				number: '',
				neighborhood: '',
				complement: '',
				city: '',
				uf: '',
				state: '',
				reference: '',
			},
		},
	});

	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: addAddress,
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['userListAddress'] });

			toast.success('Endereço selecionado com sucesso.');
		},
	});

	async function handleGetAdressByCep(cep: string) {
		try {
			const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

			if (!response.data) {
				toast.error('Ops! Edereço não localizado.');

				return;
			}

			form.setValue('addressStep.street', response.data.logradouro || '');
			form.setValue('addressStep.neighborhood', response.data.bairro || '');
			form.setValue('addressStep.city', response.data.localidade || '');
			form.setValue('addressStep.state', response.data.estado || '');
			form.setValue('addressStep.uf', response.data.uf || '');
			form.setValue('addressStep.complement', response.data.complemento || '');
		} catch (error) {
			toast.error(`Erro ao buscar Cep. Tente novamente: ${error}`);
		}
	}

	function handleCloseModal() {
		onClose();

		form.reset();
	}

	const handleSubmit = form.handleSubmit(async (formData) => {
		const { addressStep } = formData;

		try {
			const addressCreated = await mutateAsync({
				cep: addressStep.cep,
				city: addressStep.city,
				complement: addressStep.complement,
				country: addressStep.country,
				neighborhood: addressStep.neighborhood,
				number: addressStep.number,
				reference: addressStep.reference,
				state: addressStep.state,
				street: addressStep.street,
				uf: addressStep.uf,
				selected: false,
				isDefault: addressDefaut === 'Sim' ? true : false,
			});

			const listAddress = await getAddress();

			console.log(listAddress);

			if (addressDefaut === 'Sim' || listAddress.length === 0) {
				await httpClient.post('/user/address/selecteAddressDefault', {
					addressId: addressCreated.item.id,
				});

				await selectAddress(addressCreated.item.id);

				const userLogged = await httpClient.get('/user/profile');

				const bodyOmieUpdateAddress = {
					param: [
						{
							codigo_cliente_integracao: unformatCPF(
								userLogged.data.item.item.document
							),
							cnpj_cpf: userLogged.data.item.item.document,
							razao_social: userLogged.data.item.item.name,
							email: userLogged.data.item.item.email,
							cep: addressStep.cep,
							endereco: addressStep.street,
							endereco_numero: addressStep.number,
							bairro: addressStep.neighborhood,
							cidade: addressStep.city,
							estado: addressStep.uf,
						},
					],
				};

				await api.post(
					'/api/without/omie/update_client',
					bodyOmieUpdateAddress
				);
			}

			toast.success('Endereço cadastrado.');

			handleCloseModal();
		} catch (error) {
			toast.error(`Algo deu errado ao cadastrar seu endereço: ${error}`);
		} finally {
			queryClient.invalidateQueries({ queryKey: ['listAddress'] });
		}
	});

	return (
		<Dialog open={open} onOpenChange={handleCloseModal}>
			<DialogContent className='w-[900px]'>
				<div className='w-full flex flex-col'>
					<strong className='text-base'>Novo endereço</strong>
				</div>

				<form onSubmit={handleSubmit}>
					<div className='flex gap-5 w-full'>
						<div className='w-full'>
							<Label htmlFor='cep' className=''>
								CEP*
							</Label>

							<Input
								{...(form.register('addressStep.cep'),
								{
									onChange: (event) => {
										const cep = event.target.value.replace(/\D/g, '');

										form.setValue('addressStep.cep', cep);

										if (cep.length === 8) {
											handleGetAdressByCep(cep);
										}
									},
								})}
								id='cep'
								placeholder='CEP'
								maxLength={8}
							/>

							{form.formState.errors.addressStep?.cep?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.cep?.message}
								</small>
							)}
						</div>
						<div className='w-full'>
							<Label htmlFor='country' className=''>
								País/região*
							</Label>

							<Input
								{...form.register('addressStep.country')}
								id='country'
								placeholder=''
							/>

							{form.formState.errors.addressStep?.country?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.country?.message}
								</small>
							)}
						</div>
					</div>

					<div className='mt-4'>
						<Label htmlFor='street' className=''>
							Rua*
						</Label>

						<Input
							{...form.register('addressStep.street')}
							id='street'
							placeholder='Rua'
						/>

						{form.formState.errors.addressStep?.street?.message && (
							<small className='text-[#FF3434]'>
								{form.formState.errors.addressStep?.street?.message}
							</small>
						)}
					</div>

					<div className='flex gap-5 w-full mt-4'>
						<div className='w-full'>
							<Label htmlFor='number' className=''>
								Número*
							</Label>

							<Input
								{...form.register('addressStep.number')}
								id='number'
								placeholder='Número'
							/>

							{form.formState.errors.addressStep?.number?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.number?.message}
								</small>
							)}
						</div>
						<div className='w-full'>
							<Label htmlFor='neighborhood' className=''>
								Bairro*
							</Label>

							<Input
								{...form.register('addressStep.neighborhood')}
								id='neighborhood'
								placeholder=''
							/>

							{form.formState.errors.addressStep?.neighborhood?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.neighborhood?.message}
								</small>
							)}
						</div>
					</div>

					<div className='mt-4'>
						<Label htmlFor='complement' className=''>
							Complemento
						</Label>
						<Input
							{...form.register('addressStep.complement')}
							id='complement'
							placeholder='Complemento'
						/>

						{form.formState.errors.addressStep?.complement?.message && (
							<small className='text-[#FF3434]'>
								{form.formState.errors.addressStep?.complement?.message}
							</small>
						)}
					</div>

					<div className='flex gap-5 w-full mt-4'>
						<div className='w-full'>
							<Label htmlFor='city' className=''>
								Cidade*
							</Label>

							<Input
								{...form.register('addressStep.city')}
								id='city'
								placeholder='Cidade'
							/>

							{form.formState.errors.addressStep?.city?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.city?.message}
								</small>
							)}
						</div>
						<div className='w-full'>
							<Label htmlFor='city' className=''>
								Estado*
							</Label>

							<Input
								{...form.register('addressStep.state')}
								id='city'
								placeholder='Estado'
							/>

							{form.formState.errors.addressStep?.state?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.state?.message}
								</small>
							)}
						</div>
						<div className='w-full'>
							<Label htmlFor='state' className=''>
								UF*
							</Label>

							<Input
								{...form.register('addressStep.uf')}
								id='uf'
								placeholder='UF'
							/>

							{form.formState.errors.addressStep?.uf?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.uf?.message}
								</small>
							)}
						</div>
					</div>

					<div className='mt-4'>
						<Label htmlFor='reference' className=''>
							Referência
						</Label>

						<Input
							{...form.register('addressStep.reference')}
							id='reference'
							placeholder='Referência'
						/>

						{form.formState.errors.addressStep?.reference?.message && (
							<small className='text-[#FF3434]'>
								{form.formState.errors.addressStep?.reference?.message}
							</small>
						)}
					</div>

					<div className='flex flex-col w-full gap-2 mt-4'>
						<div className='flex w-full gap-2 mt-2'>
							<Home />

							<span>Este é o seu endereço padrão para envio?</span>
						</div>

						<RadioGroup
							className='flex ml-8'
							value={addressDefaut}
							onValueChange={setAddressDefault}
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='Sim' id='option-one' />
								<Label htmlFor='option-one'>Sim</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='Não' id='option-two' />
								<Label htmlFor='option-two'>Não</Label>
							</div>
						</RadioGroup>
					</div>

					<div className='flex items-end mt-4 justify-end'>
						<Button
							disabled={isPending}
							type='submit'
							className='bg-[#2B0036] rounded-full w-40 text-white text-base py-2 flex items-center justify-center hover:bg-[#5a3663]'
						>
							{isPending && 'Cadastrando...'}
							{!isPending && 'Cadastrar'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
