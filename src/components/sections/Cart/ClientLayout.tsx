/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import CartProvider from '@/contexts/Cart/CartContext';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';

interface ClientLayoutProps {
	children: React.ReactNode;
	session: any;
	isAuthenticated: boolean;
	token?: string;
	userValue: {
		email: string;
		id: string;
		name: string;
		token: string;
	};
}

export default function ClientLayout({
	children,
	session,
	isAuthenticated,
	token,
	userValue,
}: ClientLayoutProps) {
	return (
		<AuthProvider user={{ user: userValue }}>
			<CartProvider isAuthenticated={isAuthenticated} token={token}>
				<SessionProvider session={session}>{children}</SessionProvider>
			</CartProvider>
		</AuthProvider>
	);
}
