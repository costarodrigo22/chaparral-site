'use client';
import Button from '@/components/ui/Button/index';
import { useCallback, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import BeAPartnerModal from './components/BeAPartnerModal';
import api from '@/lib/axiosInstance';

interface FoodServiceProps {
	image: string;
}

interface IInfosProps {
	title: string;
	description: string;
}

export default function FoodService({ image }: FoodServiceProps) {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [info, setInfo] = useState<IInfosProps>({} as IInfosProps);

	const handleGetInfos = useCallback(async () => {
		const response = await api.get(
			'/api/without/home_be_a_partner_section/index'
		);

		setInfo({
			title: response.data.data[0]?.title,
			description: response.data.data[0].description,
		});

		console.log(response.data.data[0]);
	}, []);

	useEffect(() => {
		handleGetInfos();
	}, [handleGetInfos]);
	return (
		<>
			<BeAPartnerModal onClose={() => setOpenModal(false)} open={openModal} />
			<div
				className='bg-mediumWhite flex justify-between w-full h-[629px] 2xl:h-[800px]'
				id='foodservice'
			>
				<div className="sm:px-10 px-5 lg:px-20 flex items-center lg:items-start bg-[url('/food-service-bg.svg')] bg-no-repeat bg-center bg-cover justify-center flex-col gap-[30px] py-5 w-full lg:w-[56.32%]">
					<h2 className='font-normal text-2xl 2xl:text-4xl sm:text-3xl md:text-4xl'>
						<span
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(info?.title),
							}}
						/>
					</h2>
					<span className='font-normal text-sm 2xl:text-lg max-w-[630px] text-center lg:text-left'>
						<span
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(info?.description),
							}}
						/>
					</span>
					<Button
						src='/arrow-right.svg'
						text='Seja parceiro'
						classNameText='text-white'
						onClick={() => setOpenModal(true)}
					/>
				</div>
				<div
					className='w-[43.68%] hidden lg:block h-auto bg-no-repeat bg-center bg-cover'
					style={{
						backgroundImage: `url(${image})`,
					}}
				></div>
			</div>
		</>
	);
}
