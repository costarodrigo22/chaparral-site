'use client';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import DeliveryOrPickupSelector from '../Delivery/DeliveryOrPickupSelector';

interface IModalCreateAccount {
	open: boolean;
	onClose: () => void;
}

export default function ModalCreateAccount({
	open,
	onClose,
}: IModalCreateAccount) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-[700px]'>
				<DeliveryOrPickupSelector />
			</DialogContent>
		</Dialog>
	);
}
