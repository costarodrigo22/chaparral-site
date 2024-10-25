'use client';
import Button from '@/components/ui/Button/index';
import Image from 'next/image';

export default function OwnProduction() {
	return (
		<section
			className='flex md:gap-16 lg:gap-20 w-full items-center justify-center'
			style={{
				backgroundImage: 'url(/own-production-bg.svg)',
				aspectRatio: 1.9,
				backgroundSize: '100%',
				backgroundPosition: 'center 0',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='flex flex-col items-center text-center lg:text-left lg:items-start gap-3 md:gap-6 lg:gap-12 mt-0 lg:mt-14 xl:mt-24'>
				<div className='flex flex-col gap-2 lg:gap-7'>
					<h3 className='max-w-[400px] text-radiantGreen text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold'>
						Produzimos o nosso próprio Açaí
					</h3>
					<h4 className='max-w-[400px] font-medium text-xs md:text-sm lg:text-base xl:text-xl text-white'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type `}</h4>
				</div>
				<Button
					onClick={() => {
						window.open('/sobre', '_self');
					}}
					text='Saiba mais'
					classNameCustom=' bg-[#FFFFFF33] hover:bg-[#FFFFFF20]'
					classNameText='text-radiantGreen'
					src='/arrow-right.svg'
				/>
			</div>
			<Image
				alt='Separador de conteúdo'
				src={'/own-production-separator.svg'}
				height={319}
				width={24}
				className='hidden md:block'
			/>
			<Image
				alt='Emblema da chaparral'
				src={'/emblema-chaparral.svg'}
				height={90}
				width={190}
				className='hidden md:block'
			/>
		</section>
	);
}
