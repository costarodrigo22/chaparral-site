import Image from 'next/image';
import React from 'react';
import RecipeCard from './RecipeCard';

export default function Recipes() {
	return (
		<div className="w-full lg:max-h-[361px] bg-mediumWhite rounded-[30px] mt-5 lg:mt-[-30px] bg-[url('/recipe-bg.svg')] bg-no-repeat bg-center bg-cover h-auto pb-10 lg:pb-0 ">
			<div className='flex gap-5'>
				<div className='flex items-center flex-col lg:flex-row gap-7 w-full lg:pl-11 pt-16'>
					<Image
						alt='Ícone de xícara de café'
						height={65}
						width={57}
						src={'/cup-coffe-icon.svg'}
					/>
					<div className='flex flex-col items-center lg:items-start gap-6'>
						<h3 className='text-black font-semibold text-2xl'>Receitas</h3>
						<span className=' text-lightGray max-w-[269px] text-base font-normal text-center lg:text-left'>
							Açaí Perfeito? Encontre a Combinação Ideal!
						</span>
					</div>
				</div>
			</div>
			<div className='mt-20 flex flex-col lg:flex-row justify-evenly items-center lg:items-start h-auto gap-5'>
				<RecipeCard
					background='bg-[#fff]'
					src='/acai-recipe-card.svg'
					text='Descubra o sabor do açaí com outras frutas: uma explosão de frescor em cada colherada!'
					link='https://www.google.com.br/?hl=pt-BR'
				/>
				<RecipeCard
					background='bg-[linear-gradient(180deg,#2B0036_37.46%,#5C006F_100%)]'
					src='/acai-recipe-card.svg'
					text='Descubra o sabor do açaí com outras frutas: uma explosão de frescor em cada colherada!'
					textColor='text-[#fff]'
					link='https://www.google.com.br/?hl=pt-BR'
				/>
				<RecipeCard
					background='bg-[#fff]'
					src='/acai-recipe-card.svg'
					text='Descubra o sabor do açaí com outras frutas: uma explosão de frescor em cada colherada!'
					link='https://www.google.com.br/?hl=pt-BR'
				/>
			</div>
		</div>
	);
}
