'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
		reference: z.string(),
	}),
});

type FormData = z.infer<typeof schema>;

export default function UpdateAddress({ open, onClose }: IModalUpdateAddress) {
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	function handleCloseModal() {
		onClose();

		form.reset();
	}

	const handleSubmit = form.handleSubmit(async (formData) => {
		console.log(formData);
	});

	return (
		<Dialog open={open} onOpenChange={handleCloseModal}>
			<DialogContent className='w-[900px]'>
				<div className='w-full flex flex-col'>
					<strong className='text-base'>Atualizar endereço</strong>
				</div>

				<form onSubmit={handleSubmit}>
					<div className='flex gap-5 w-full'>
						<div className='w-full'>
							<Label htmlFor='cep' className=''>
								CEP*
							</Label>

							<Input
								{...form.register('addressStep.cep')}
								id='cep'
								placeholder='CEP'
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
							placeholder='Rua'
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
							<Label htmlFor='state' className=''>
								Estado*
							</Label>

							<Input
								{...form.register('addressStep.state')}
								id='state'
								placeholder=''
							/>

							{form.formState.errors.addressStep?.state?.message && (
								<small className='text-[#FF3434]'>
									{form.formState.errors.addressStep?.state?.message}
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
							placeholder='Rua'
						/>

						{form.formState.errors.addressStep?.reference?.message && (
							<small className='text-[#FF3434]'>
								{form.formState.errors.addressStep?.reference?.message}
							</small>
						)}
					</div>

					<div className='flex items-end mt-4 justify-end'>
						<Button
							disabled={form.formState.isSubmitting}
							type='submit'
							className='bg-[#2B0036] rounded-full w-40 text-white text-base py-2 flex items-center justify-center hover:bg-[#5a3663]'
						>
							Atualizar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
