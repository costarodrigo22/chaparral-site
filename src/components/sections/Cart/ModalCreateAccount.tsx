'use client';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
// import DeliveryOrPickupSelector from '../Delivery/DeliveryOrPickupSelector';
import Stepper from '@/components/ui/Stepper';
import DeliveryForm from '../Delivery/DeliveryForm';
import PickUpForm from '../Delivery/PickUpForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
interface IModalCreateAccount {
	open: boolean;
	onClose: () => void;
}

const schema = z.object({
	infosStep: z.object({
		name: z.string().min(1, 'Nome é obrigatório!'),
		cpf_cpnj: z.string().min(1, 'CPF ou CNPJ é obrigatório!'),
		phone: z.string().min(1, 'Telefone é obrigatório!'),
		email: z.string().min(1, 'E-mail é obrigatório!'),
	}),
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

export type FormData = z.infer<typeof schema>;

export default function ModalCreateAccount({
	open,
	onClose,
}: IModalCreateAccount) {
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const router = useRouter();

	const handleSubmit = form.handleSubmit(async (formData) => {
		console.log(formData);

		router.push('/Delivery');
	});

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-[900px]'>
				<FormProvider {...form}>
					<form onSubmit={handleSubmit}>
						<Stepper
							initialStep={0}
							steps={[
								{
									label: 'Informações pessoais',
									content: <DeliveryForm />,
								},
								{
									label: 'Endereço',
									content: <PickUpForm />,
								},
							]}
						/>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
