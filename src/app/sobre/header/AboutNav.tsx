'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Nunito } from 'next/font/google';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { handleScroll } from '@/lib/utils';
import Link from 'next/link';
// import SearchInput from './SearchInput';

const Nunitofont = Nunito({
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export default function AboutNav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [flag, setFlag] = useState('');

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const flag = localStorage.getItem('flag');
		if (flag) {
			setFlag(flag);
			return;
		} else {
			localStorage.setItem('flag', 'pt-br');
		}
	}, []);

	function setLocalStorageFlag(flag: string) {
		localStorage.setItem('flag', flag);
		setFlag(flag);
	}
	const flagMap: { [key: string]: string } = {
		'pt-br': '/brasil-flag.svg',
		'en-us': '/usa-flag.svg',
		es: '/es-flag.svg',
	};
	return (
		<div>
			<nav className='w-full h-[90px] fixed flex z-50 bg-transparent bg-gradient-to-r from-[#2B0036] to-[#36133D] text-white'>
				<div className='flex items-center justify-center w-[15%]'>
					<div className='relative hidden md:block max-w-[139px] h-auto mt-5'>
						<Image
							onClick={() => {
								window.open('/', '_self');
							}}
							className='hover:cursor-pointer'
							src='/iaça-logo.svg'
							alt='Logo'
							width={110}
							height={80}
						/>
					</div>
				</div>
				<div className='flex items-center justify-between w-[85%] mt-4'>
					<div className='flex items-center md:gap-[65px] lg:gap-[80px] xl:gap-[90px]'>
						<a
							href='/'
							className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
						>
							Home
						</a>
						<span
							className={` hover:cursor-pointer font-bold text-base ${Nunitofont.className} hidden md:block`}
							onClick={() => handleScroll('produtos')}
						>
							Produtos
						</span>
						<span
							className={` hover:cursor-pointer font-bold text-base ${Nunitofont.className} hidden md:block`}
							onClick={() => handleScroll('receitas')}
						>
							Receitas
						</span>
						<span
							className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
						>
							Contato
						</span>
					</div>
					<div className='flex items-center gap-[71px] lg:mr-20 xl:mr-28'>
						{/* <SearchInput /> */}

						<DropdownMenu>
							<DropdownMenuTrigger className='outline-none'>
								{flag && flagMap[flag] && (
									<div className='flex gap-2 mr-20 md:mr-0'>
										<Image
											alt='Carrinho de compras'
											height={24}
											width={24}
											src={flagMap[flag]}
										/>
									</div>
								)}
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-full bg-[#36133D] border-none'>
								<DropdownMenuLabel className='text-center'>
									<span
										className={`w-20 text-white font-semibold text-base ${Nunitofont.className}`}
									>
										Idioma
									</span>
								</DropdownMenuLabel>
								<DropdownMenuSeparator className='bg-[#6a227a]' />
								<DropdownMenuItem
									className='hover:cursor-pointer hover:bg-[#280e2d]'
									onClick={() => setLocalStorageFlag('pt-br')}
								>
									<div className='flex gap-2 '>
										<span
											className={`w-20 text-white font-semibold text-base ${Nunitofont.className}`}
										>
											Português
										</span>
										<Image
											alt='Carrinho de compras'
											height={24}
											width={24}
											src={'/brasil-flag.svg'}
										/>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									className='hover:cursor-pointer hover:bg-[#280e2d]'
									onClick={() => setLocalStorageFlag('en-us')}
								>
									<div className='flex gap-2'>
										<span
											className={`w-20 text-white font-semibold text-base ${Nunitofont.className}`}
										>
											Inglês
										</span>
										<Image
											alt='Carrinho de compras'
											height={24}
											width={24}
											src={'/usa-flag.svg'}
										/>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									className='hover:cursor-pointer hover:bg-[#280e2d]'
									onClick={() => setLocalStorageFlag('es')}
								>
									<div className='flex gap-2'>
										<span
											className={`w-20 text-white font-semibold text-base ${Nunitofont.className}`}
										>
											Espanhol
										</span>
										<Image
											alt='Carrinho de compras'
											height={24}
											width={24}
											src={'/es-flag.svg'}
										/>
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Link
							href='/cart'
							className='w-12 h-12 rounded-full fixed md:static right-3 bg-transparent flex items-center justify-center hover:bg-[#3b1344a1] transition-all duration-300 ease-in-out cursor-pointer'
						>
							<Image
								alt='Carrinho de compras'
								height={24}
								width={24}
								src={'/shopping-cart.svg'}
							/>
						</Link>
					</div>
					<div
						className=' fixed cursor-pointer md:hidden left-3'
						onClick={toggleMenu}
					>
						<Image
							src='/menu-icon.svg'
							alt='Menu Icon'
							width={25}
							height={25}
						/>
					</div>
				</div>
			</nav>

			<div
				className={`fixed top-0 left-0 w-[250px] h-full bg-[#2B0036] text-white transition-transform duration-300 z-50 ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-[-110%]'
				} md:hidden`}
			>
				<div className='flex items-center justify-between p-4'>
					<Image
						onClick={() => {
							window.open('/');
						}}
						alt='Logo iaca'
						src={'/iaça-logo.svg'}
						height={60}
						width={60}
					/>
					<div className='cursor-pointer' onClick={toggleMenu}>
						<Image
							src='/close-icon.svg'
							alt='Close Icon'
							width={30}
							height={30}
						/>
					</div>
				</div>
				<ul className='p-4'>
					<li className='mb-4'>
						<div className='mb-10'>
							<a
								href='#'
								className={`text-base text-center ${Nunitofont.className}`}
							>
								Menu
							</a>
						</div>
					</li>
					<li className='mb-4'>
						<a href='/' className={`text-base ${Nunitofont.className}`}>
							Home
						</a>
					</li>
					<li className='mb-4'>
						<span
							onClick={() => handleScroll('produtos')}
							className={`text-base ${Nunitofont.className}`}
						>
							Produtos
						</span>
					</li>
					<li className='mb-4'>
						<span
							onClick={() => handleScroll('receitas')}
							className={`text-base ${Nunitofont.className}`}
						>
							Receitas
						</span>
					</li>
					<li>
						<a href='#' className={`text-base ${Nunitofont.className}`}>
							Contato
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
