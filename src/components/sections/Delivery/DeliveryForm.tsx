'use client';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { StepperFooter, StepperNextButton } from '@/components/ui/Stepper';
import { useStepper } from '@/hooks/useStepper';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../Cart/ModalCreateAccount';

export default function DeliveryForm() {
	const form = useFormContext<FormData>();

	const { nextStep } = useStepper();

	async function handleNextStep() {
		const isValid = await form.trigger('infosStep');

		if (isValid) nextStep();
	}

	return (
		<div className='flex flex-col'>
			<div className='mt-6'>
				<Label htmlFor='fantasyName' className=''>
					Nome/Nome fantasia*
				</Label>

				<Input
					{...form.register('infosStep.name')}
					id='fantasyName'
					placeholder='Nome'
				/>

				{form.formState.errors.infosStep?.name?.message && (
					<small className='text-[#FF3434]'>
						{form.formState.errors.infosStep?.name?.message}
					</small>
				)}
			</div>

			<div className='flex gap-5 w-full mt-4'>
				<div className='w-full'>
					<Label htmlFor='cpfCnpj' className=''>
						CPF/CNPJ*
					</Label>

					<Input
						{...form.register('infosStep.cpf_cpnj')}
						id='cpfCnpj'
						placeholder='CPF/CNPJ'
					/>

					{form.formState.errors.infosStep?.cpf_cpnj?.message && (
						<small className='text-[#FF3434]'>
							{form.formState.errors.infosStep?.cpf_cpnj?.message}
						</small>
					)}
				</div>
				<div className='w-full'>
					<Label htmlFor='phone' className=''>
						Telefone*
					</Label>

					<Input
						{...form.register('infosStep.phone')}
						id='phone'
						placeholder='Telefone'
					/>

					{form.formState.errors.infosStep?.phone?.message && (
						<small className='text-[#FF3434]'>
							{form.formState.errors.infosStep?.phone?.message}
						</small>
					)}
				</div>
			</div>

			<div className='w-full mt-4'>
				<Label htmlFor='email' className=''>
					E-mail*
				</Label>

				<Input
					{...form.register('infosStep.email')}
					id='email'
					placeholder='E-mail'
				/>

				{form.formState.errors.infosStep?.email?.message && (
					<small className='text-[#FF3434]'>
						{form.formState.errors.infosStep?.email?.message}
					</small>
				)}
			</div>

			<StepperFooter>
				<StepperNextButton onClick={handleNextStep} type='button' />
			</StepperFooter>
		</div>
	);
}
