'use client';

import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { useState } from 'react';
import DeliveryForm from './DeliveryForm';
import PickUpForm from './PickUpForm';

export default function DeliveryOrPickupSelector() {
	const [selection, setSelection] = useState('');

	return (
		<div className='flex'>
			<div>
				<RadioGroup
					className='flex flex-col space-y-1'
					onValueChange={(value) => setSelection(value)}
				>
					<div className='rounded-md border p-5'>
						<RadioGroupItem value='Entrega' id='option-one' />
						<Label className='ml-2 text-base font-medium' htmlFor='option-one'>
							Entrega
						</Label>
					</div>
					{selection === 'Entrega' && <DeliveryForm />}

					<div className='rounded-md border p-5'>
						<RadioGroupItem value='Retirada' id='option-two' />
						<Label className='ml-2 text-base font-medium' htmlFor='option-two'>
							Retirada
						</Label>
					</div>
				</RadioGroup>
			</div>

			<div>{selection === 'Retirada' && <PickUpForm />}</div>
		</div>
	);
}
