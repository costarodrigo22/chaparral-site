export default function Product() {
	return (
		<div className='flex flex-col w-full mb-10'>
			<div className='flex justify-between items-center w-full mt-28 px-32 mb-10'>
				<span className='text-2xl font-bold'>Detalhes do produto</span>

				<span className='text-[#2B0036] text-xs font-medium'>
					Voltar ao início
				</span>
			</div>

			<div className='flex px-32'>
				<div className='bg-[#F0F0F0] w-[380px] h-[380px] rounded-sm'></div>
			</div>
		</div>
	);
}
