'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { StepperFooter, StepperPreviousButton } from '@/components/ui/Stepper';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../Cart/ModalCreateAccount';

export default function PickUpForm() {
  const form = useFormContext<FormData>();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 w-full mt-6">
        <div className="w-full">
          <Label htmlFor="cep" className="">
            CEP*
          </Label>

          <Input
            {...form.register('addressStep.cep')}
            id="cep"
            placeholder="CEP"
          />

          {form.formState.errors.addressStep?.cep?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.addressStep?.cep?.message}
            </small>
          )}
        </div>
        <div className="w-full">
          <Label htmlFor="country" className="">
            País/região*
          </Label>

          <Input
            {...form.register('addressStep.country')}
            id="country"
            placeholder="País/região"
          />

          {form.formState.errors.addressStep?.country?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.addressStep?.country?.message}
            </small>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="street" className="">
          Rua*
        </Label>

        <Input
          {...form.register('addressStep.street')}
          id="street"
          placeholder="Rua"
        />

        {form.formState.errors.addressStep?.street?.message && (
          <small className="text-[#FF3434]">
            {form.formState.errors.addressStep?.street?.message}
          </small>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-5 w-full mt-4">
        <div className="w-full">
          <Label htmlFor="number" className="">
            Número*
          </Label>

          <Input
            {...form.register('addressStep.number')}
            id="number"
            placeholder="Número"
          />

          {form.formState.errors.addressStep?.number?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.addressStep?.number?.message}
            </small>
          )}
        </div>
        <div className="w-full">
          <Label htmlFor="neighborhood" className="">
            Bairro*
          </Label>

          <Input
            {...form.register('addressStep.neighborhood')}
            id="neighborhood"
            placeholder="Bairro"
          />

          {form.formState.errors.addressStep?.neighborhood?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.addressStep?.neighborhood?.message}
            </small>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="complement" className="">
          Complemento
        </Label>
        <Input
          {...form.register('addressStep.complement')}
          id="complement"
          placeholder="Complemento"
        />

        {form.formState.errors.addressStep?.complement?.message && (
          <small className="text-[#FF3434]">
            {form.formState.errors.addressStep?.complement?.message}
          </small>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-5 w-full mt-4">
        <div className="w-full">
          <Label htmlFor="city" className="">
            Cidade*
          </Label>

          <Input
            {...form.register('addressStep.city')}
            id="city"
            placeholder="Cidade"
          />

          {form.formState.errors.addressStep?.city?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.addressStep?.city?.message}
            </small>
          )}
        </div>
        <div className="w-full">
          <Label htmlFor="state" className="">
            UF*
          </Label>

          <Input
            {...form.register('addressStep.state')}
            id="state"
            placeholder="UF"
          />

          {form.formState.errors.addressStep?.state?.message && (
            <small className="text-[#FF3434]">
              {form.formState.errors.addressStep?.state?.message}
            </small>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="reference" className="">
          Referência
        </Label>

        <Input
          {...form.register('addressStep.reference')}
          id="reference"
          placeholder="Referência"
        />

        {form.formState.errors.addressStep?.reference?.message && (
          <small className="text-[#FF3434]">
            {form.formState.errors.addressStep?.reference?.message}
          </small>
        )}
      </div>

      <StepperFooter>
        <StepperPreviousButton />

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
