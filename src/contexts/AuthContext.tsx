'use client';

import React, { createContext } from 'react';

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
	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
