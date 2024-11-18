import { useContext } from 'react';
import { QuantityContext } from '@/contexts/Cart/QuantityContext';

export function useQuantity() {
	const context = useContext(QuantityContext);

	return context;
}
