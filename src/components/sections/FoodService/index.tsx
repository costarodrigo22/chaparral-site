import Button from '@/components/ui/Button';
import React from 'react';

export default function FoodService() {
	return (
		<div
			className=' bg-mediumWhite flex justify-between w-full h-[629px] 2xl:h-[800px]'
			id='foodservice'
		>
			<div className="px-20 flex items-center lg:items-start bg-[url('/food-service-bg.svg')] bg-no-repeat bg-center bg-cover justify-center flex-col gap-[75px] py-5 w-full lg:w-[56.32%] ">
				<h2 className=' font-normal text-2xl 2xl:text-4xl sm:text-3xl md:text-4xl text-black'>
					ÍAÇA Food Service
				</h2>
				<span className=' text-[#5B5B5B] font-normal text-sm 2xl:text-lg max-w-[630px]'>
					Transforme o seu negócio com a nossa dedicação e expertise! A ÍAÇA
					traz uma linha completa de produtos, pensada para atender às demandas
					dos mais variados setores profissionais. Seja você um empreendedor
					buscando inovação ou uma empresa consolidada que deseja surpreender
					seus clientes, nossa parceria é o ingrediente ideal para criar
					experiências memoráveis. Juntos, podemos elevar o padrão e encantar
					seus clientes em cada interação.
				</span>
				<Button src='/arrow-right.svg' text='Seja parceiro' />
			</div>
			<div className="w-[43.68%] hidden lg:block h-auto bg-[url('/ifood-service-acai.svg')] bg-no-repeat bg-center bg-cover "></div>
		</div>
	);
}
