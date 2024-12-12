'use client';

import CartProvider from '@/contexts/Cart/CartContext';
import Nav from './Nav';
import { IData } from '../Footer/components/ModalContacts';
import React from 'react';

interface NavProps {
	company: IData;
	logoImage: string;
	children: React.ReactNode;
}

export default function NavWithContext({
	company,
	logoImage,
	children,
}: NavProps) {
	return (
		<CartProvider>
			<Nav company={company} logoImage={logoImage} />

			{children}
		</CartProvider>
	);
}
