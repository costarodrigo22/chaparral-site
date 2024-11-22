import Image from 'next/image';
import logo from '../../public/logo-iaca-purple.svg';

export default function Loading() {
	return (
		<div className='flex flex-col items-center justify-center w-full h-screen'>
			<Image src={logo} alt='Iaça logo' />
			<span className='text-[#320e3a]'>carregando Íaça...</span>
		</div>
	);
}
