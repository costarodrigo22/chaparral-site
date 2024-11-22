'use client';

import Image from 'next/image';

export default function Header({ image }: { image: string }) {
	return (
		<div className='w-full text-white flex h-full flex-col'>
			<Image
				src={image}
				alt='Imagem principal do header Íaça'
				loading='lazy'
				className='object-cover w-full h-full mt-[60px]'
				width={0}
				height={0}
			></Image>
		</div>
	);
}
