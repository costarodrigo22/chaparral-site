import SignUpForm from '@/components/sections/SignUp/SignUpForm';

export default function SignUp() {
	return (
		<div className='w-full h-full mt-36'>
			<div
				style={{
					backgroundImage: 'url(/image-login-page.svg)',
					backgroundSize: '100%',
					aspectRatio: 2.27,
					backgroundPosition: 'center 0',
					backgroundRepeat: 'no-repeat',
				}}
				className='w-full h-[340px] relative'
			></div>
			<SignUpForm />
		</div>
	);
}
