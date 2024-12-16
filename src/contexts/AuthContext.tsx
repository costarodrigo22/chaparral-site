'use client';

import { localStorageKeys } from '@/config/localStorageKeys';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useEffect } from 'react';

interface IAuthContextValue {
	user: {
		email: string;
		id: string;
		name: string;
		token: string;
	};
}

interface IAuthProviderProps {
	children: React.ReactNode;
	user: IAuthContextValue;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children, user }: IAuthProviderProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnWindowFocus: false,
			},
		},
	});

	useEffect(() => {
		if (!user.user.token) {
			return;
		}

		localStorage.setItem(localStorageKeys.ACCESS_TOKEN, user.user.token);
	}, [user]);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContext.Provider value={user}>{children}</AuthContext.Provider>
		</QueryClientProvider>
	);
}
