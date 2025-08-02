'use client';
import Button from '@/components/ui/Button/index';
import api from '@/lib/axiosInstance';
import { getColors } from '@/lib/utils';
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
			className='flex xl:pl-44 pl-6 md:gap-10 lg:gap-10 w-full items-center justify-start'
			style={{
				backgroundImage: `url(${image})`,
				aspectRatio: 1.9,
				backgroundSize: '100%',
				backgroundPosition: 'center 0',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='bg-stone-50/70 p-8 rounded-lg flex flex-col text-center md:text-left items-center md:items-start gap-3 md:gap-6 lg:gap-1 mt-0 lg:mt-14 xl:mt-24 h-auto w-2/3'>
				<div className='flex flex-col gap-2 lg:gap-2'>
					<h3
						className=' text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold'
						style={{ color: getColors(infos?.title || '') }}
						dangerouslySetInnerHTML={{
							__html: infos?.title || '',
						}}
					/>
					<h4
						className='text-white text-justify 2xl:max-w-[700px] font-medium text-xs md:text-sm lg:text-base xl:text-xl'
						dangerouslySetInnerHTML={{
							__html: infos?.description || '',
						}}
					/>
				</div>
				<Button
					onClick={() => {
						window.open('/sobre', '_self');
					}}
					style={{ color: getColors(infos?.title || '') }}
					text='Saiba mais'
					classNameCustom='bg-[#FFFFFF20] hover:bg-[#91848433]'
					src='/arrow-right.svg'
				/>
			</div>
		</section>
	);
}
