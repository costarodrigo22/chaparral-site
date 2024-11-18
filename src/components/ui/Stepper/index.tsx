'use client';

import { createContext, useCallback, useState } from 'react';
import { useStepper } from '@/hooks/useStepper';
import { cn } from '@/lib/utils';
import { MoveLeft, MoveRight } from 'lucide-react';
import logoIaca from '../../../../public/logo-iaca-purple.svg';
import Image from 'next/image';

interface StepperContextProps {
  previousStep: () => void;
  nextStep: () => void;
}

export const StepperContext = createContext({} as StepperContextProps);

interface StepperProps {
  title?: string;
  description1?: string;
  descriptionColored?: string;
  description2?: string;
  initialStep?: number;
  steps: {
    id: number;
    label: string;
    content: React.ReactNode;
  }[];
}

interface StepperNextButtonProps extends React.ComponentProps<'button'> {
  preventDefault?: boolean;
}

interface StepperPreviousStepButtonContainerProps
  extends React.ComponentProps<'button'> {
  preventDefault?: boolean;
}

export default function Stepper({
  steps,
  initialStep = 0,
  title,
  description1,
  description2,
  descriptionColored,
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [, setIsCompleted] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );

  const previousStep = useCallback(() => {
    setCurrentStep((prevState) => Math.max(0, prevState - 1));
  }, []);

  const nextStep = useCallback(() => {
    setIsCompleted((prevCompletedSteps) =>
      prevCompletedSteps.map((completed, index) =>
        index === currentStep ? true : completed
      )
    );

    setCurrentStep((prevState) => Math.min(steps.length - 1, prevState + 1));
  }, [steps, currentStep]);

  return (
    <StepperContext.Provider value={{ previousStep, nextStep }}>
      <div className="flex flex-col md:flex-row w-full">
        <ul className="w-[300px] flex-col flex items-start md:border-r">
          <Image
            src={logoIaca}
            alt="Logo IAÇA"
            width={70}
            height={60}
            className="mb-10 lg:mr-0"
          />

          {steps.map((step, index) => (
            <>
              <div key={step.id} className="flex">
                <div
                  className={cn(
                    'mr-2 w-[25px] h-[25px] rounded-full border flex items-center justify-center',
                    currentStep !== index && index === 0 && 'opacity-50'
                  )}
                >
                  <div
                    className={cn(
                      'w-[12px] h-[12px] bg-black rounded-full',
                      index === 0
                        ? 'bg-black'
                        : currentStep === index
                        ? 'bg-black'
                        : 'bg-white'
                    )}
                  ></div>
                </div>
                <li key={step.id}>
                  <span className={cn(currentStep !== index && 'opacity-50')}>
                    {step.label}
                  </span>
                </li>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    'w-[2px] h-[40px] my-2 bg-black flex rounded-full ml-[12px]',
                    currentStep !== index && index === 0 && 'opacity-50'
                  )}
                ></div>
              )}
            </>
          ))}
        </ul>

        <div className="w-full flex flex-col md:pl-7 mt-10">
          <strong className="text-base mb-2">{title || `Criar conta`}</strong>

          <span>
            {description1 ||
              `Olá! Você está a poucos passo de saborear o melhor açaí do mundo.`}
          </span>
          <span className="lg:flex">
            <p className="text-[#FBA301] mr-[3px]">
              {descriptionColored || `Conclua seu cadastro`}
            </p>
            {description2 || `e embarque nessa experiência deliciosa!`}
          </span>

          {steps[currentStep].content}
        </div>
      </div>
    </StepperContext.Provider>
  );
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
  return <footer className="mt-5 flex justify-end gap-2">{children}</footer>;
}

export function StepperPreviousButton({
  type = 'button',
  onClick,
  ...props
}: StepperPreviousStepButtonContainerProps) {
  const { previousStep } = useStepper();

  return (
    <button
      className="w-28 py-2 bg-[#E2E8F0] border rounded-full text-black text-base font-semibold flex items-center justify-center"
      type={type}
      onClick={onClick ?? previousStep}
      {...props}
    >
      <MoveLeft className="mr-2" />
      Voltar
    </button>
  );
}

export function StepperNextButton({
  type = 'button',
  onClick,
  ...props
}: StepperNextButtonProps) {
  const { nextStep } = useStepper();

  return (
    <button
      className="bg-[#2B0036] rounded-full w-40 text-white text-base py-2 flex items-center justify-center"
      type={type}
      onClick={onClick ?? nextStep}
      {...props}
    >
      <span className="mr-2">Continuar</span>
      <MoveRight />
    </button>
  );
}
