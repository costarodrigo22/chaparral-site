'use client';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface RecipeCardProps {
	src: string;
	text: string;
	background?: string;
	link?: string;
	textColor?: string;
}

export default function RecipeCard({
	src,
	text,
	link,
	background,
	textColor,
}: RecipeCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={cn(
				`max-w-[352px] bg-white transition-all h-full duration-700 ease-in-out flex flex-col items-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] rounded-[20px] group/recipecard ${
					isHovered ? 'lg:h-[490px]' : 'lg:h-[304px]'
				}`,
				background
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Image src={src} alt='Imagem da receita' height={196} width={352} />
			<div className='flex flex-col items-center px-8 mt-7 gap-20'>
				<span
					className={cn(
						'text-lightGray font-normal text-base lg:mb-3 lg:group-hover/recipecard:mb-0',
						textColor
					)}
				>
					{text}
				</span>
				<div
					className={cn(
						`transition-opacity duration-1000 ${
							isHovered ? 'lg:opacity-100 ' : 'lg:opacity-0 '
						}`,

						'mb-12'
					)}
				>
					<Button
						text='Quero ver'
						src='/arrow-right.svg'
						onClick={() => {
							window.open(link);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
