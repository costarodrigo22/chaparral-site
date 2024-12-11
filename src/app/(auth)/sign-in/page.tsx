import { z } from 'zod';
import { signIn } from '../../../lib/auth';
import LoginForm from '@/components/sections/login/LoginForm';
import { AuthError, CredentialsSignin } from 'next-auth';

const schema = z.object({
	email: z
		.string()
		.min(1, 'E-mail é obrigatório')
		.email('Informe um e-mail válido'),
	password: z.string().min(1, 'Senha é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
	async function loginAction(formData: FormData) {
		'use server';

		try {
			await signIn('credentials', {
				email: formData.email,
				password: formData.password,
				redirectTo: '/cart',
			});
		} catch (error) {
			if (error instanceof CredentialsSignin) {
				return { error: 'Credenciais inválidas.' };
			}

			if (error instanceof AuthError) {
				return { error: 'Alguma coisa deu errado. Tente novamente.' };
			}

			throw error;
		}
	}

	return (
		<div className='w-[700px] p-0'>
			<LoginForm onLoginAction={loginAction} />
		</div>
	);
}
