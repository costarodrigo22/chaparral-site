'use client';

import { Button } from '@/components/ui/Button';
import { usePaymentSelection } from '@/hooks/useSelectionPayment';
import { ArrowRight } from 'lucide-react';

export default function EnableButton() {
	const { selection, handleOpenModalConfirmOrder } = usePaymentSelection();

	return (
		<Button
			onClick={handleOpenModalConfirmOrder}
			className='bg-[#2B0036] w-full rounded-full mt-5 hover:bg-[#5a3663]'
			disabled={!selection}
		>
			Finalizar compra
			<ArrowRight />
		</Button>
	);
}
