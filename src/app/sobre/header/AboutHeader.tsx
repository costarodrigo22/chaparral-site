import React from 'react';
// import AboutNav from './AboutNav';

export default function AboutHeader() {
	return (
		<header>
			{/* <AboutNav /> */}
			<div className='h-[89px]'></div>
			<div
				style={{
					backgroundImage: 'url(/cumbuca-acai-sobre.svg)',
					aspectRatio: 2.27,
					backgroundSize: '100%',
					backgroundPosition: 'center 0',
					backgroundRepeat: 'no-repeat',
				}}
				className='w-full text-white flex h-auto flex-col gap-[160px]'
			>
				<div className=' xl:ml-[85px] lg:ml-[55px] sm:ml-[30px] sm:text-left text-center pt-3 flex flex-col gap-3 sm:gap-6 xl:gap-8 sm:mt-[30px] md:mt-[90px] lg:mt-[110px] xl:mt-[130px] 2xl:mt-[200px]'>
					<h1 className=' font-bold text-xl md:text-2xl xl:text-4xl'>
						Somos o ÍAÇA
					</h1>
					<h2 className='max-w-[648px] text-xs md:text-base font-medium xl:text-lg'>
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.`}
					</h2>
				</div>
			</div>
		</header>
	);
}
