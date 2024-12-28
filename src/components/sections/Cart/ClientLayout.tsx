/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import CartProvider from '@/contexts/Cart/CartContext';
import { SessionProvider } from 'next-auth/react';

interface ClientLayoutProps {
	children: React.ReactNode;
	session: any;
	isAuthenticated: boolean;
	token?: string;
}

export default function ClientLayout({
	children,
	session,
	isAuthenticated,
	token,
}: ClientLayoutProps) {
	return (
		<CartProvider isAuthenticated={isAuthenticated} token={token}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</CartProvider>
	);
}
