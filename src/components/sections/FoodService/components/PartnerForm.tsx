'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { StepperFooter } from '@/components/ui/Stepper';
import { useFormContext } from 'react-hook-form';
import { PartnerData } from './BeAPartnerModal';

export default function PartnerForm() {
  const form = useFormContext<PartnerData>();

  return (
    <div>
      <div className="flex flex-col gap-4 w-full mt-6">
        <div className="w-full">
          <Label htmlFor="fantasy_name">Nome Fantasia*</Label>
          <Input
            {...form.register('infosStep.fantasy_name')}
            id="fantasy_name"
            placeholder="Nome Fantasia"
          />
          {form.formState.errors.infosStep?.fantasy_name?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.infosStep?.fantasy_name?.message}
            </small>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="cpf_cnpj">CPF ou CNPJ*</Label>
          <Input
            {...form.register('infosStep.cpf_cnpj')}
            id="cpf_cnpj"
            placeholder="CPF ou CNPJ"
          />
          {form.formState.errors.infosStep?.cpf_cnpj?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.infosStep?.cpf_cnpj?.message}
            </small>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="phone_number">Telefone*</Label>
          <Input
            {...form.register('infosStep.phone_number')}
            id="phone_number"
            placeholder="Telefone"
          />
          {form.formState.errors.infosStep?.phone_number?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.infosStep?.phone_number?.message}
            </small>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="email">E-mail*</Label>
          <Input
            {...form.register('infosStep.email')}
            id="email"
            placeholder="E-mail"
          />
          {form.formState.errors.infosStep?.email?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.infosStep?.email?.message}
            </small>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="message">Mensagem</Label>
          <Input
            {...form.register('infosStep.message')}
            id="message"
            placeholder="Escreva sua mensagem"
          />
        </div>
      </div>

      <StepperFooter>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="bg-[#2B0036] rounded-full w-40 text-white text-base py-2 flex items-center justify-center hover:bg-[#5a3663]"
        >
          Finalizar
        </Button>
      </StepperFooter>
    </div>
  );
}
