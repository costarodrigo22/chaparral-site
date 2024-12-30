/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { httpClient } from '@/lib/httpClient';
import { toast } from 'sonner';

interface IModalForgotPassword {
	open: boolean;
	onClose: () => void;
}

export default function ModalForgotPassword({
	open,
	onClose,
}: IModalForgotPassword) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSendNewCodeToResetPassword() {
		setLoading(true);

		try {
			await httpClient.post('/auth/forgot-password', { email });

			toast.success('Código enviado. Verifique seu e-mail');
		} catch (error: any) {
			toast.error(
				`Algo deu errado ao enviar seu código: ${error.response.data.error}`
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-[350px]'>
				<DialogHeader>
					<DialogTitle>Esqueceu a senha?</DialogTitle>
					<DialogDescription>
						Informe seu email e enviaremos um código de verificação
					</DialogDescription>
				</DialogHeader>

				<div className='grid w-full items-center gap-1.5 mb-4'>
					<Label className='text-xs' htmlFor='email'>
						E-mail
					</Label>
					<Input
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						id='email'
						placeholder='E-mail'
					/>
				</div>

				<div className='flex items-center justify-end gap-4'>
					<Button
						disabled={!email || loading}
						onClick={handleSendNewCodeToResetPassword}
						className='bg-[#2B0036] rounded-full w-full hover:bg-[#421d4b]'
					>
						{loading && 'Enviando...'}
						{!loading && 'Enviar código'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
