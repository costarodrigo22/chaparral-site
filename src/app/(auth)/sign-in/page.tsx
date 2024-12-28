import { z } from 'zod';
import { signIn } from '../../../lib/auth';
import LoginForm from '@/components/sections/login/LoginForm';
import { AuthError, CredentialsSignin } from 'next-auth';

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha é obrigatório'),
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
    <div className="w-full h-full mt-36">
      <div
        style={{
          backgroundImage: 'url(/image-login-page.svg)',
          backgroundSize: '100%',
          aspectRatio: 1,
          backgroundPosition: 'center 0',
          backgroundRepeat: 'no-repeat',
        }}
        className="w-full h-[340px] relative"
      ></div>
      <LoginForm onLoginAction={loginAction} />
    </div>
  );
}
