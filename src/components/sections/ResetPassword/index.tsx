/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeClosed } from 'lucide-react';

const schema = z.object({
	code: z.string().min(6, 'Código de verificação é obrigatório.'),
	newPAssword: z.string().min(8, 'Informar a senha é obrigatório.'),
});

type FormData = z.infer<typeof schema>;

export default function ResetPassword() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get('email');

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

		const body = {
			email: email,
			code: data.code,
			newPassword: data.newPAssword,
		};

		try {
			await httpClient.post('/auth/reset-password', body);

			toast.success('Sua senha foi alterada com sucesso.');

			router.push('/sign-in');
		} catch (error: any) {
			toast.error(
				`Algo deu errado ao resetar sua senha: ${error.response.data.error}`
			);
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

			<span className='font-medium text-sm'>Resete sua senha!</span>

			<div className='grid w-full items-center gap-1.5 mb-4'>
				<Label className='text-xs' htmlFor='name'>
					Código
				</Label>
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

			<div className='grid w-full items-center gap-1.5 mb-4 relative'>
				<Label className='text-xs' htmlFor='password'>
					Senha
				</Label>
				<Input
					id='password'
					placeholder='Senha'
					type={showPassword ? 'text' : 'password'}
					{...register('newPAssword')}
				/>

				{showPassword ? (
					<EyeClosed
						onClick={() => setShowPassword(!showPassword)}
						color='#a4a2a5'
						size={20}
						className='absolute right-4 top-8 cursor-pointer'
					/>
				) : (
					<Eye
						onClick={() => setShowPassword(!showPassword)}
						color='#a4a2a5'
						size={20}
						className='absolute right-4 top-8 cursor-pointer'
					/>
				)}

				<div className='h-4'>
					{errors.newPAssword && (
						<span className='text-red-400 text-xs'>
							{errors.newPAssword.message}
						</span>
					)}
				</div>
			</div>

			<Button
				disabled={loading}
				type='submit'
				className='bg-[#2B0036] rounded-full mt-4 w-[200px] hover:bg-[#421d4b]'
			>
				{loading && 'Enviando...'}
				{!loading && 'Confirmar'}
			</Button>
		</form>
	);
}
