'use client';

import { createContext, useCallback, useState } from 'react';
import { useStepper } from '@/hooks/useStepper';

interface StepperContextProps {
	previousStep: () => void;
	nextStep: () => void;
}

export const StepperContext = createContext({} as StepperContextProps);

interface StepperProps {
	initialStep?: number;
	steps: {
		label: string;
		description: string;
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

export default function Stepper({ steps, initialStep = 0 }: StepperProps) {
	const [currentStep, setCurrentStep] = useState(initialStep);
	const [isCompleted, setIsCompleted] = useState<boolean[]>(
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
			<div>
				<ul>
					{steps.map((step, index) => (
						<div key={step.label}>
							<div className='index'>
								<span>{index + 1}</span>
							</div>

							<li key={step.label}>
								<span>{step.label}</span>

								<small>{step.description}</small>
							</li>
						</div>
					))}
				</ul>

				<div>{steps[currentStep].content}</div>
			</div>
		</StepperContext.Provider>
	);
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
	return (
		<footer
			style={{
				marginTop: 20,
				display: 'flex',
				justifyContent: 'flex-end',
				gap: 10,
			}}
		>
			{children}
		</footer>
	);
}

export function StepperPreviousButton({
	type = 'button',
	onClick,
	...props
}: StepperPreviousStepButtonContainerProps) {
	const { previousStep } = useStepper();

	return (
		<button type={type} onClick={onClick ?? previousStep} {...props}>
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
		<button type={type} onClick={onClick ?? nextStep} {...props}>
			Próximo
		</button>
	);
}
