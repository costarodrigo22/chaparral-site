import GenericCard from './components/GenericCard';

export default function Details() {
	return (
		<div className=' min-h-[461px] flex flex-col gap-12 lg:gap-0 py-10 lg:py-0 lg:flex-row items-center justify-evenly'>
			<GenericCard
				src='/iaca-logo-pink.svg'
				link='/sobre'
				linkText='Saiba mais'
				title='Sobre a Íaça'
				text='Somos a  ÍAÇA, a marca que transforma o açaí em uma experiência única e revitalizante.'
			/>
			<GenericCard
				src='/iaca-logo-pink.svg'
				link='https://www.google.com.br/?hl=pt-BR'
				linkText='Saiba mais'
				title='Responsabilidade com a sustentabilidade'
				text='Somos a  ÍAÇA, a marca que transforma o açaí em uma experiência única e revitalizante.'
			/>
			<GenericCard
				src='/iaca-logo-pink.svg'
				link='https://www.google.com.br/?hl=pt-BR'
				linkText='Saiba mais'
				title='Nossa missão e valores'
				text='Conheça mais sobre nosso cuidado ao levar o melhor da fruta até o pote, para você.'
			/>
		</div>
	);
}
