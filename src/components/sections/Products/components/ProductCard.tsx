import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface ProductCardProps {
	text: string;
	customClass: string;
	src: string;
	backgroundImage: string;
	backgroundColor: string;
	srcLogo: string;
}
export default function ProductCard({
	backgroundColor,
	customClass,
	src,
	srcLogo,
	backgroundImage,
}: ProductCardProps) {
	return (
		<div
			style={{ background: `${backgroundColor}` }}
			className={cn(`w-full h-full `, customClass)}
		>
			<div
				className={cn('w-full h-full flex flex-col ', customClass)}
				style={{
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='w-full h-full flex items-start justify-end pt-5 pr-7'>
					<Image alt='logo do Iaça' height={71} width={123} src={srcLogo} />
				</div>
				<Link
					href='/product'
					className='w-full h-full flex flex-col justify-center items-center gap-4 pb-5'
				>
					<Image alt='Produto iaça' height={250} width={368} src={src} />
					<Button text='Quero o meu' src='/arrow-right.svg' />
				</Link>
			</div>
		</div>
	);
}
