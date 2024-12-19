'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import logoIaca from '../../../../public/logo-iaca-purple.svg';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/InputOTP';
import { httpClient } from '@/lib/httpClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = z.object({
	email: z
		.string()
		.min(1, 'E-mail é obrigatório.')
		.email('Informe um e-mail válido.'),
	code: z.string().min(6, 'Código de verificação é obrigatório.'),
});

type FormData = z.infer<typeof schema>;

export default function ConfirmAccount() {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const {
		register,
		control,
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		shouldFocusError: true,
	});

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		setLoading(true);

		const bodyConfirmation = {
			email: data.email,
			code: data.code,
		};

		try {
			await httpClient.post('/auth/account-confirmation', bodyConfirmation);

			toast.success('Código confirmado.');

			router.push('/sign-in');
		} catch (error) {
			toast.error(`Algo deu errado ao confirmar seu código: ${error}`);
		} finally {
			setLoading(false);
		}
	});

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white rounded-md px-8 py-8 flex items-center justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] shadow-md'
		>
			<Image src={logoIaca} alt='Logo IAÇA' width={70} height={60} />

			<span className='font-medium text-sm'>
				Faça seu cadastro em nossa plataforma!
			</span>

			<div className='grid w-full items-center gap-1.5 mt-4 mb-4'>
				<Label className='text-xs' htmlFor='name'>
					E-mail
				</Label>
				<Input id='email' placeholder='E-mail' {...register('email')} />

				{errors.email && (
					<span className='text-red-400 text-xs h-4'>
						{errors.email.message}
					</span>
				)}
			</div>

			<div className='grid w-full items-center gap-1.5 mb-4'>
				<Label className='text-xs' htmlFor='name'>
					Código
				</Label>
				{/* <Input id='code' placeholder='Código' {...register('code')} /> */}
				<Controller
					control={control}
					name='code'
					render={({ field: { value, onChange } }) => (
						<>
							<InputOTP maxLength={6} value={value} onChange={onChange}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</>
					)}
				/>

				{errors.code && (
					<span className='text-red-400 text-xs h-4'>
						{errors.code.message}
					</span>
				)}
			</div>

			<Button
				disabled={loading}
				type='submit'
				className='bg-[#2B0036] rounded-full mt-4 w-[200px] hover:bg-[#421d4b]'
			>
				{loading && 'Confirmando...'}
				{!loading && 'Confirmar conta'}
			</Button>
		</form>
	);
}
