'use client';

// import { getAddressSelected } from '@/services/address';
// import { useQuery } from '@tanstack/react-query';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

export interface IAddressSelected {
	cep: string;
	city: string;
	complement: string;
	country: string;
	id: string;
	neighborhood: string;
	number: string;
	reference: string;
	selected: boolean;
	state: string;
	street: string;
	uf: string;
}

interface IAddressContextProps {
	addressSelected: IAddressSelected;
	setAddressSelected: (address: IAddressSelected) => void;
	freight: number;
	setFreight: (value: number) => void;
}

export const DeliveryContext = createContext({} as IAddressContextProps);

export default function DeliveryProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [addressSelected, setAddressSelected] = useState(
		{} as IAddressSelected
	);
	const [freight, setFreight] = useState<number>(() => {
		const savedFreight = localStorage.getItem('freight');

		return savedFreight ? parseFloat(savedFreight) : 0;
	});

	useEffect(() => {
		localStorage.setItem('freight', freight.toString());
	}, [freight]);

	return (
		<DeliveryContext.Provider
			value={{
				addressSelected,
				setAddressSelected,
				freight,
				setFreight,
			}}
		>
			{children}
		</DeliveryContext.Provider>
	);
}

export function useDelivery() {
	const context = useContext(DeliveryContext);

	return context;
}
