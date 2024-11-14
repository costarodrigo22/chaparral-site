'use client';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import Stepper from '@/components/ui/Stepper';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import PartnerForm from './PartnerForm';
import { toast } from 'sonner';
import api from '@/lib/axiosInstance';

interface IBeAPartnerModal {
  open: boolean;
  onClose: () => void;
}

const schema = z.object({
  infosStep: z.object({
    fantasy_name: z.string().min(1, 'Nome é obrigatório!'),
    cpf_cnpj: z.string().min(1, 'CPF ou CNPJ é obrigatório!'),
    phone_number: z.string().min(1, 'Telefone é obrigatório!'),
    email: z.string().email('E-mail é obrigatório!'),
    message: z.string(),
  }),
});

export type PartnerData = z.infer<typeof schema>;

export default function BeAPartnerModal({ onClose, open }: IBeAPartnerModal) {
  const form = useForm<PartnerData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (partnerData) => {
    console.log(partnerData);
    const body = {
      fantasy_name: partnerData.infosStep.fantasy_name,
      cpf_cnpj: partnerData.infosStep.cpf_cnpj,
      phone_number: partnerData.infosStep.phone_number,
      email: partnerData.infosStep.email,
      message: partnerData.infosStep.message,
    };
    try {
      const res = await api.post('/api/without/email/send_partnership', body);
      onClose();
      form.reset();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao enviar!');
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-y-auto overflow-x-auto p-3">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <Stepper
              description1="Olá! Você está a poucos passos de se tornar um parceiro e fazer parte da experiência mais deliciosa do mundo!"
              description2="e venha crescer com a gente, oferecendo o melhor açaí para todos."
              descriptionColored="Envie seus dados"
              title="Quero ser parceiro"
              initialStep={0}
              steps={[
                {
                  id: Math.random(),
                  label: 'Informações',
                  content: <PartnerForm />,
                },
              ]}
            />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
