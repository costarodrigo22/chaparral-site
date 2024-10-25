'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

interface IQuantityContextProps {
	quantity: number;
	setQuantity: (value: number) => void;
}

export const QuantityContext = createContext({} as IQuantityContextProps);

export default function QuantityProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [quantity, setQuantity] = useState(1);

	return (
		<QuantityContext.Provider value={{ quantity, setQuantity }}>
			{children}
		</QuantityContext.Provider>
	);
}

export function useQuantity() {
	const context = useContext(QuantityContext);

	return context;
}
