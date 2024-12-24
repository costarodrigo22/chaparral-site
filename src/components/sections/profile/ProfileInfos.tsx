'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { getPresignedURL, uploadFileAvatar } from '@/services/user';
import { FileImage } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

export default function ProfileInfos() {
	const [file, setFile] = useState<File[]>([]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			setFile(acceptedFiles);
		},
	});

	function handleRemoveAvatar() {
		console.log('excluir foto do perfil');
	}

	async function handleUploadAvatar() {
		try {
			const url = await getPresignedURL(file[0].name);

			await uploadFileAvatar(url, file[0]);
		} catch (error) {
			toast.error(`Erro ao atualizar o avatar: ${error}`);
		}
	}

	return (
		<div className='px-0 md:px-10 xl:px-32'>
			<div className='flex items-center justify-center w-full flex-col'>
				<div
					{...getRootProps()}
					className={cn(
						'border h-32 w-28 rounded-md border-dashed transition-colors flex items-center justify-center',
						isDragActive && 'bg-accent/50 '
					)}
				>
					<input {...getInputProps()} />

					<FileImage size={30} className='stroke-[#ccc]' />
				</div>

				<span>mais infos</span>

				<Button
					onClick={handleUploadAvatar}
					className='bg-[#2B0036] hover:bg-[#492452]'
				>
					Salvar
				</Button>
			</div>
		</div>
	);
}
