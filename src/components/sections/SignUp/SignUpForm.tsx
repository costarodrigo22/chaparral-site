/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import logoIaca from '../../../../public/logo-iaca-purple.svg';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import {
  formatCPF,
  formatPhone,
  unformatCPF,
  getJustNumbers,
} from '@/lib/utils';
import { httpClient } from '@/lib/httpClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    document: z
      .string()
      .min(14, 'CPF é obrigatório')
      .max(14, 'Digite um CPF válido'),
    phone: z
      .string()
      .min(15, 'Telefone é obrigatório')
      .max(15, 'Digite um telefone válido'),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('Informe um e-mail válido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    confirmPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas devem ser iguais',
  });

type FormData = z.infer<typeof schema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true);

    const bodyOmie = {
      param: [
        {
          codigo_cliente_integracao: unformatCPF(data.document),
          cnpj_cpf: unformatCPF(data.document),
          email: data.email,
          razao_social: data.name,
          nome_fantasia: data.name,
          telefone1_numero: getJustNumbers(data.phone),
          tags: [
            {
              tag: 'Site',
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/without/omie/create_client`,
        bodyOmie
      );

      if (response.data.faultcode === 'SOAP-ENV:Client-102') {
        toast.warning('Usuário já cadastrado para esse E-mail.');

        const bodyResend = {
          email: data.email,
        };

        try {
          await httpClient.post('/user/profile/resend-code', bodyResend);
        } catch (error: any) {
          toast.warning(error.response.data.message);
        }

        router.push('/confirm-account');

        return;
      }

      const bodyCognito = {
        email: data.email,
        password: data.confirmPassword,
        name: data.name,
        document: data.document,
        phone: `+55${getJustNumbers(data.phone)}`,
        code_omie: response.data.codigo_cliente_omie,
      };

      await httpClient.post('/auth/sign-up', bodyCognito);

      toast.success(
        'Seu cadastro está quase pronto. Confirme o código que chegou no E-mail adicionado.'
      );

      router.push(`/confirm-account/?email=${data.email}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md px-8 py-8 flex items-center justify-center flex-col absolute left-1/2 -translate-x-1/2 -translate-y-[25%] sm:-translate-y-[1/2] w-full sm:w-[700px] shadow-md"
    >
      <Image src={logoIaca} alt="Logo IAÇA" width={70} height={60} />

      <span className="font-medium text-sm">
        Faça seu cadastro em nossa plataforma!
      </span>

      <div className="grid w-full items-center gap-1.5 mt-4 mb-4">
        <Label className="text-xs" htmlFor="name">
          Nome
        </Label>
        <Input id="name" placeholder="Nome" {...register('name')} />

        {errors.name && (
          <span className="text-red-400 text-xs h-4">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex sm:gap-5 w-full flex-col sm:flex-row">
        <div className="grid w-full items-center gap-1.5 sm:mb-4">
          <Label className="text-xs" htmlFor="cpf">
            CPF
          </Label>
          <Input
            id="document"
            placeholder="CPF"
            {...register('document')}
            onChange={(e) => setValue('document', formatCPF(e.target.value))}
          />

          <div className="h-4 mb-2">
            {errors.document && (
              <span className="text-red-400 text-xs">
                {errors.document.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5 sm:mb-4">
          <Label className="text-xs" htmlFor="phone">
            Telefone
          </Label>
          <Input
            id="phone"
            placeholder="Telefone"
            {...register('phone')}
            onChange={(e) => setValue('phone', formatPhone(e.target.value))}
          />

          <div className="h-4 mb-2">
            {errors.phone && (
              <span className="text-red-400 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5 mb-4">
        <Label className="text-xs" htmlFor="email">
          E-mail
        </Label>
        <Input id="email" placeholder="E-mail" {...register('email')} />

        {errors.email && (
          <span className="text-red-400 text-xs h-4">
            {errors.email.message}
          </span>
        )}
      </div>

      <Separator className="mt-3 relative">
        <span className="absolute -top-6 left-8 bg-white p-3 text-[13px] font-medium text-[#a4a2a5]">
          Segurança
        </span>
      </Separator>

      <div className="flex sm:gap-5 mt-4 w-full flex-col sm:flex-row">
        <div className="grid w-full items-center gap-1.5 sm:mb-4 relative">
          <Label className="text-xs" htmlFor="password">
            Senha
          </Label>
          <Input
            id="password"
            placeholder="Senha"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />

          {showPassword ? (
            <EyeClosed
              onClick={() => setShowPassword(!showPassword)}
              color="#a4a2a5"
              size={20}
              className="absolute right-4 top-8 cursor-pointer"
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              color="#a4a2a5"
              size={20}
              className="absolute right-4 top-8 cursor-pointer"
            />
          )}

          <div className="h-4 mb-2">
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5 sm:mb-4 relative">
          <Label className="text-xs" htmlFor="confirm-password">
            Confirme a senha
          </Label>
          <Input
            id="confirm-password"
            placeholder="Confirme a senha"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
          />

          {showConfirmPassword ? (
            <EyeClosed
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              color="#a4a2a5"
              size={20}
              className="absolute right-4 top-8 cursor-pointer"
            />
          ) : (
            <Eye
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              color="#a4a2a5"
              size={20}
              className="absolute right-4 top-8 cursor-pointer"
            />
          )}
          <div className="h-4">
            {errors.confirmPassword && (
              <span className="text-red-400 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <Button
        disabled={loading}
        type="submit"
        className="bg-[#2B0036] rounded-full mt-4 w-[200px] hover:bg-[#421d4b]"
      >
        {loading && 'Cadastrando...'}
        {!loading && 'Cadastrar'}
      </Button>
    </form>
  );
}
