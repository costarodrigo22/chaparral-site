import api from '@/lib/axiosInstance';
import { httpClient } from '@/lib/httpClient';
import axios from 'axios';

export async function userLogged() {
	const { data } = await api.get('/user/profile');

	return data;
}

export async function getPresignedURL(fileName: string) {
	const { data } = await httpClient.post('/user/avatar/presigned-url', {
		fileName,
	});

	return data.signedUrl;
}

export async function uploadFileAvatar(
	url: string,
	file: File,
	onProgress?: (progress: number) => void
) {
	await axios.put(url, file, {
		headers: {
			'Content-Type': file.type,
		},
		onUploadProgress: ({ total, loaded }) => {
			const percentage = Math.round((loaded * 100) / (total ?? 0));

			onProgress?.(percentage);
		},
	});
}
