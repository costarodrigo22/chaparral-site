'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ModalConfirmClient from '../Cart/ModalConfirmClient';
import ModalCreateAccount from '../Cart/ModalCreateAccount';

export default function BuyModalTrigger() {
	const [openModalConfirmClient, setOpenModalConfirmClient] = useState(false);
	const [openModalCreateAccount, setOpenModalCreateAccount] = useState(false);

	function handleOpenModalConfirmClient() {
		setOpenModalConfirmClient(true);
	}

	function handleCloseModalConfirmClient() {
		setOpenModalConfirmClient(false);
	}

	function handleOpenModalCreateAccount() {
		setOpenModalCreateAccount(true);

		setOpenModalConfirmClient(false);
	}

	function handleCloseModalCreateAccount() {
		setOpenModalCreateAccount(false);
	}

	return (
		<>
			<ModalConfirmClient
				open={openModalConfirmClient}
				onClose={handleCloseModalConfirmClient}
				onOpenModalCreateAccount={handleOpenModalCreateAccount}
			/>

			<ModalCreateAccount
				open={openModalCreateAccount}
				onClose={handleCloseModalCreateAccount}
			/>

			<Button
				onClick={handleOpenModalConfirmClient}
				className='w-full rounded-full mt-5'
			>
				Continuar a compra
				<ArrowRight />
			</Button>
		</>
	);
}
