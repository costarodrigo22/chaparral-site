'use client';
import { useEffect, useState } from 'react';
import { getColors } from '@/lib/utils';
import Image from 'next/image';
import MediaModal from './components/MediaModal';

interface IAboutInstitutionalProps {
	infos: {
		title: string;
		link: string;
		description: string;
	};
	image: string;
}

export default function AboutInstitutional({
	infos,
	image,
}: IAboutInstitutionalProps) {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [titleColor, setTitleColor] = useState('');

	useEffect(() => {
		if (infos) {
			setTitleColor(getColors(infos.title) || 'inherit');
		}
	}, [infos]);

	return (
		<>
			<MediaModal
				onClose={() => setOpenModal(false)}
				open={openModal}
				link={infos.link}
			/>
			<section
				className='flex xl:pl-44 pl-6 md:gap-16 mb-8 lg:gap-20 w-full items-center justify-start'
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
							style={{ color: titleColor }}
							dangerouslySetInnerHTML={{
								__html: infos.title,
							}}
						/>
						<h4
							className=' text-white max-w-[400px] xl:max-w-[500px] font-medium text-xs md:text-sm lg:text-base xl:text-xl'
							dangerouslySetInnerHTML={{
								__html: infos.description,
							}}
						/>
					</div>
					<div
						className='flex items-center gap-4 hover:opacity-90 cursor-pointer'
						onClick={() => {
							setOpenModal(true);
						}}
					>
						<div className=' rounded-full bg-[#D9D9D94D] flex items-center justify-center h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]'>
							<Image
								className='ml-1'
								src={'/playIcon.svg'}
								alt='Ver vídeo'
								width={14}
								height={18}
							/>
						</div>
						<span
							style={{ color: titleColor }}
							className=' text-base md:text-lg lg:text-xl font-semibold'
						>
							Assistir Vídeo
						</span>
					</div>
				</div>
			</section>
		</>
	);
}
