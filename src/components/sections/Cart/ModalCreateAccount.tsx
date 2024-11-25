'use client';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import Stepper from '@/components/ui/Stepper';
import DeliveryForm from '../Delivery/DeliveryForm';
import PickUpForm from '../Delivery/PickUpForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
interface IModalCreateAccount {
  open: boolean;
  onClose: () => void;
}

const schema = z.object({
  infosStep: z.object({
    name: z.string().min(1, 'Nome é obrigatório!'),
    cpf_cpnj: z
      .string()
      .min(1, 'CPF ou CNPJ é obrigatório!')
      .refine(
        (val) =>
          /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val) ||
          /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val),
        'CPF ou CNPJ inválido!'
      ),
    phone: z
      .string()
      .min(1, 'Telefone é obrigatório!')
      .refine(
        (val) =>
          /^\(\d{2}\) \d{4}-\d{4}$/.test(val) ||
          /^\(\d{2}\) \d{5}-\d{4}$/.test(val),
        'Telefone inválido!'
      ),
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
    state: z
      .string()
      .min(1, 'Estado é obrigatório!')
      .max(2, 'Informe apenas a sigla do estado'),
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = form.handleSubmit(async (formData: any) => {
    localStorage.removeItem('code_client');
    localStorage.removeItem('cpf_client');

    const body = {
      param: [
        {
          codigo_cliente_integracao: formData.infosStep.cpf_cpnj,
          cnpj_cpf: formData.infosStep.cpf_cpnj,
          email: formData.infosStep.email,
          razao_social: formData.infosStep.name,
          nome_fantasia: formData.infosStep.name,
          telefone1_numero: formData.infosStep.phone,
          cep: formData.addressStep.cep,
          endereco: formData.addressStep.street,
          endereco_numero: formData.addressStep.number,
          bairro: formData.addressStep.neighborhood,
          cidade: formData.addressStep.city,
          estado: formData.addressStep.state,
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
        body
      );

      localStorage.setItem('code_client', response.data.codigo_cliente_omie);
      localStorage.setItem(
        'cpf_client',
        response.data.codigo_cliente_integracao
      );

      form.reset();

      router.push('/Delivery');
    } catch (error) {
      toast.error('Algo deu errado ao fazer seu cadastro 😢');
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[95vw] 2xl:max-w-[1000px] overflow-y-auto overflow-x-auto p-3">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <Stepper
              initialStep={0}
              steps={[
                {
                  id: Math.random(),
                  label: 'Informações pessoais',
                  content: <DeliveryForm />,
                },
                {
                  id: Math.random(),
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
