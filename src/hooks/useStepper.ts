import { StepperContext } from '@/components/ui/Stepper';
import { useContext } from 'react';

export function useStepper() {
	return useContext(StepperContext);
}
