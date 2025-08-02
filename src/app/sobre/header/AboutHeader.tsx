'use client';

interface IAboutHeaderProps {
	base64: string;
	title: string;
	description: string;
}

export default function AboutHeader({
	base64,
	description,
	title,
}: IAboutHeaderProps) {
	return (
		<header>
			<div className='h-[89px]'></div>
			<div
				style={{
					backgroundImage: `url(${base64})`,
					aspectRatio: 2.27,
					backgroundSize: '100%',
					backgroundPosition: 'center 0',
					backgroundRepeat: 'no-repeat',
				}}
				className='w-full text-white flex h-auto flex-col gap-[160px]'
			>
				<div className='xl:ml-[85px] lg:ml-[55px] sm:ml-[30px] sm:text-left text-center pt-3 flex flex-col gap-3 sm:gap-6 xl:gap-8 sm:mt-[30px] md:mt-[90px] lg:mt-[110px] xl:mt-[130px] 2xl:mt-[200px]'>
					<h1
						className='font-bold text-xl md:text-2xl xl:text-4xl'
						dangerouslySetInnerHTML={{
							__html: title,
						}}
					></h1>
					<h2
						className='max-w-[648px] text-xs md:text-base font-medium xl:text-lg text-justify'
						dangerouslySetInnerHTML={{
							__html: description,
						}}
					></h2>
				</div>
			</div>
		</header>
	);
}
