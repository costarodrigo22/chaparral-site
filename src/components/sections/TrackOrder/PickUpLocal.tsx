'use client';
interface ILocalProps {
	delivery_form: string;
	address: {
		cep: string;
		city: string;
		complement: string;
		neighborhood: string;
		number: string;
		street: string;
	};
}

export default function PickUpLocal({ delivery_form, address }: ILocalProps) {
	return (
		<div className='w-full px-6 py-6 shadow-md rounded-md'>
			<span className='text-base'>
				{delivery_form === 'ENTREGA' ? 'Receber em:' : 'Retirar em:'}
			</span>

			<div className='flex items-center justify-between'>
				<div className='mt-2 flex flex-col gap-1'>
					<span className='text-[#898989] text-base'>
						{address.street}, {address.number}, {address.neighborhood},{' '}
						{address.city}
					</span>
					<span className='text-[#898989] text-base'>{address.complement}</span>
				</div>
			</div>
		</div>
	);
}
