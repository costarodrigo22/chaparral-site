'use client';

import { createContext, ReactNode, useState } from 'react';

interface IPaymentSelectionContext {
	selection: string;
	openModalConfirmOrder: boolean;
	setSelection: (value: string) => void;
	handleOpenModalConfirmOrder: () => void;
	handleCloseModalConfirmOrder: () => void;
}

export const PaymentSelectionContext = createContext(
	{} as IPaymentSelectionContext
);

export function PaymentSelectionProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [selection, setSelection] = useState<string>('');
	const [openModalConfirmOrder, setOpenModalConfirmOrder] = useState(false);

	function handleOpenModalConfirmOrder() {
		setOpenModalConfirmOrder(true);
	}

	function handleCloseModalConfirmOrder() {
		setOpenModalConfirmOrder(false);
	}

	return (
		<PaymentSelectionContext.Provider
			value={{
				selection,
				openModalConfirmOrder,
				setSelection,
				handleOpenModalConfirmOrder,
				handleCloseModalConfirmOrder,
			}}
		>
			{children}
		</PaymentSelectionContext.Provider>
	);
}
