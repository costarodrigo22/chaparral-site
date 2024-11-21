'use client';
import Button from '@/components/ui/Button/index';
import api from '@/lib/axiosInstance';
import { getColors } from '@/lib/utils';
import DOMPurify from 'dompurify';
import { useCallback, useEffect, useState } from 'react';

interface DataItem {
	id: string;
	title: string;
	description: string;
	background_image: string;
	created_at: string;
	updated_at: string;
}

export interface ApiResponse {
	data: DataItem[];
}

interface OwnProductionProps {
	image: string;
}

interface IInfosProps {
	title: string;
	description: string;
}

export default function OwnProduction({ image }: OwnProductionProps) {
	const [infos, setInfos] = useState<IInfosProps>({} as IInfosProps);

	const hadleGetInfos = useCallback(async () => {
		const response = await api.get(
			'/api/without/home_institutional_section/index'
		);

		setInfos({
			title: response.data.data[0].title,
			description: response.data.data[0].description,
		});
	}, []);

	useEffect(() => {
		hadleGetInfos();
	}, [hadleGetInfos]);

	return (
		<section
			className='flex xl:pl-44 pl-6 md:gap-16 lg:gap-20 w-full items-center justify-start'
			style={{
				backgroundImage: `url(${image})`,
				aspectRatio: 1.9,
				backgroundSize: '100%',
				backgroundPosition: 'center 0',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='flex flex-col text-center md:text-left items-center md:items-start gap-3 md:gap-6 lg:gap-12 mt-0 lg:mt-14 xl:mt-24'>
				<div className='flex flex-col gap-2 lg:gap-7'>
					<h3
						className='max-w-[400px] text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold'
						style={{ color: getColors(infos?.title || '') }}
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(infos?.title || ''),
						}}
					/>
					<h4
						className='text-white max-w-[400px] xl:max-w-[500px] font-medium text-xs md:text-sm lg:text-base xl:text-xl'
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(infos?.description || ''),
						}}
					/>
				</div>
				<Button
					onClick={() => {
						window.open('/sobre', '_self');
					}}
					style={{ color: getColors(infos?.title || '') }}
					text='Saiba mais'
					classNameCustom='bg-[#FFFFFF33] hover:bg-[#FFFFFF20]'
					src='/arrow-right.svg'
				/>
			</div>
		</section>
	);
}
