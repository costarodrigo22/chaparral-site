import { PaymentSelectionContext } from '@/contexts/Payment/PaymentContext';
import { useContext } from 'react';

export function usePaymentSelection() {
	const context = useContext(PaymentSelectionContext);

	return context;
}
