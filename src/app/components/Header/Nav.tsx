'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Nunito } from 'next/font/google';
import SearchInput from './SearchInput';

const Nunitofont = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="w-full max-h-[125px] flex">
        <div className="flex items-end justify-center w-[15%]">
          <div className="relative w-[80px] max-w-[139px] h-auto mt-5">
            <Image src="/iaça-logo.svg" alt="Logo" width={139} height={80} />
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-around w-[85%] mt-4">
          <div className="flex items-center md:gap-[108px] lg:gap-[80px] xl:gap-[150px]">
            <span
              className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
            >
              IAÇA
            </span>
            <span
              className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
            >
              Produtos
            </span>
            <span
              className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
            >
              Contato
            </span>
            <SearchInput />
          </div>
          <div className="cursor-pointer md:hidden mr-5" onClick={toggleMenu}>
            <Image
              src="/menu-icon.svg"
              alt="Menu Icon"
              width={30}
              height={30}
            />
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-[#2B0036] text-white transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'
        } md:hidden`}
      >
        <div className="flex items-center justify-between p-4">
          <span className={`text-lg ${Nunitofont.className}`}>Menu</span>
          <div className="cursor-pointer" onClick={toggleMenu}>
            <Image
              src="/close-icon.svg"
              alt="Close Icon"
              width={30}
              height={30}
            />
          </div>
        </div>
        <ul className="p-4">
          <li className="mb-4">
            <a href="#" className={`text-base ${Nunitofont.className}`}>
              IAÇA
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className={`text-base ${Nunitofont.className}`}>
              Produtos
            </a>
          </li>
          <li>
            <a href="#" className={`text-base ${Nunitofont.className}`}>
              Contato
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
