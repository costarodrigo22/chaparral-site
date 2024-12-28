'use client';

import { localStorageKeys } from '@/config/localStorageKeys';
import {
	deleteAvatar,
	getPresignedURL,
	uploadFileAvatar,
	userLogged,
} from '@/services/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IAuthContextValue {
	user: {
		email: string;
		id: string;
		name: string;
		token: string;
	};
	userLogged: IUserLoggedProps;
	loadingAvatar: boolean;
	progressLoadingAvatar: number;
	loadingGetAvatar: boolean;
	setLoading: (value: boolean) => void;
	setProgress: (value: number) => void;
	setUpload: (file: File | null) => void;
	handleRemoveAvatar: () => void;
	handleUploadAvatar: () => void;
}

interface IAuthProviderProps {
	children: React.ReactNode;
	user: {
		email: string;
		id: string;
		name: string;
		token: string;
	};
}

interface IUserLoggedProps {
	avatarUrl: string;
	code_omie: number;
	document: string;
	email: string;
	id: string;
	is_address_default_registered: boolean;
	name: string;
	phone: string;
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

	const [userLoggedInfo, setuserLoggedInfo] = useState({} as IUserLoggedProps);
	const [upload, setUpload] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [loadingAvatar, setLoadingAvatar] = useState(false);

	const handleGetDataUserLogged = useCallback(async () => {
		setLoadingAvatar(true);

		try {
			const response = await userLogged();

			setuserLoggedInfo(response);
		} catch (error) {
			toast.error(`Algo deu errado ao buscar seu avatar: ${error}`);
		} finally {
			setLoadingAvatar(false);
		}
	}, []);

	async function handleRemoveAvatar() {
		setUpload(null);

		try {
			await deleteAvatar();
		} catch (error) {
			toast.error(`Algo deu errado ao deletar o avatar. ${error}`);
		} finally {
			handleGetDataUserLogged();
		}
	}

	async function handleUploadAvatar() {
		if (!upload) {
			toast.error('Por favor, selecione uma imagem antes de salvar.');

			return;
		}

		setLoading(true);

		try {
			const url = await getPresignedURL(upload.name);

			await uploadFileAvatar(url, upload, (progress) => {
				setProgress(progress);
			});

			toast.success('Avatar atualizado com sucesso!');
		} catch (error) {
			toast.error(`Erro ao atualizar o avatar: ${error}`);
		} finally {
			setLoading(false);
			setProgress(0);
			handleGetDataUserLogged();
		}
	}

	useEffect(() => {
		handleGetDataUserLogged();
	}, [handleGetDataUserLogged]);

	useEffect(() => {
		if (!user.token) {
			return;
		}

		localStorage.setItem(localStorageKeys.ACCESS_TOKEN, user.token);
	}, [user]);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContext.Provider
				value={{
					user: user,
					userLogged: userLoggedInfo,
					loadingAvatar: loading,
					loadingGetAvatar: loadingAvatar,
					progressLoadingAvatar: progress,
					handleRemoveAvatar,
					handleUploadAvatar,
					setLoading,
					setProgress,
					setUpload,
				}}
			>
				{children}
			</AuthContext.Provider>
		</QueryClientProvider>
	);
}
