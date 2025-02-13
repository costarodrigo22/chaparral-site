'use client';
import MissionCard from './_components/MissionCard';

interface IMissionProps {
	featuredDescription: string;
	missionDescription: string;
	valuesDescription: string;
	visionDescription: string;
}

export default function Mission({
	featuredDescription,
	missionDescription,
	valuesDescription,
	visionDescription,
}: IMissionProps) {
	return (
		<section className='bg-primaryWhite py-28 lg:px-24 md:px-10 xl:px-48 w-full h-auto flex flex-col gap-11'>
			<div className='text-center w-full flex flex-col gap-7 items-center justify-center px-5 sm:px-0'>
				<h1 className='max-w-[879px] font-semibold text-2xl sm:text-4xl text-darkGray'>
					Nossa missão e valores
				</h1>
				<h2
					className='max-w-[879px] font-medium text-base sm:text-lg text-lightGray'
					dangerouslySetInnerHTML={{
						__html: featuredDescription,
					}}
				/>
			</div>
			<div className='flex flex-col md:flex-row gap-12 items-center justify-center h-[560px]'>
				<MissionCard
					src={'./target-icon.svg'}
					text={missionDescription}
					title='Missão'
				/>
				<MissionCard
					src={'/eye_icon.png'}
					text={visionDescription}
					title='Visão'
				/>
				<MissionCard
					src={'./medal-icon.svg'}
					text={valuesDescription}
					title='Valores'
				/>
			</div>
		</section>
	);
}
