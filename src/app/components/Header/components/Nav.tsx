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
      <nav className="w-full h-[90px] fixed flex z-50 bg-gradient-to-r from-[#2B0036] to-[#36133D] text-white">
        <div className="flex items-center justify-center w-[15%]">
          <div className="relative hidden md:block max-w-[139px] h-auto mt-5">
            <Image src="/iaça-logo.svg" alt="Logo" width={139} height={80} />
          </div>
        </div>
        <div className="flex items-center w-[85%] mt-4">
          <div className="flex items-center md:gap-[78px] lg:gap-[80px] xl:gap-[78px]">
            <span
              className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
            >
              Sobre o ÍAÇA
            </span>
            <span
              className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
            >
              Produtos
            </span>
            <span
              className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
            >
              Receitas
            </span>
            <span
              className={`font-bold text-base ${Nunitofont.className} hidden md:block`}
            >
              Contato
            </span>
            <div className="flex items-center gap-[71px]">
              <SearchInput />
              <div className="w-12 h-12 rounded-full fixed md:static right-16 bg-transparent flex items-center justify-center hover:bg-[#3b1344a1] transition-all duration-300 ease-in-out cursor-pointer">
                <Image
                  alt="Carrinho de compras"
                  height={24}
                  width={24}
                  src={'/brasil-flag.svg'}
                />
              </div>
              <div className="w-12 h-12 rounded-full fixed md:static right-3 bg-transparent flex items-center justify-center hover:bg-[#3b1344a1] transition-all duration-300 ease-in-out cursor-pointer">
                <Image
                  alt="Carrinho de compras"
                  height={24}
                  width={24}
                  src={'/shopping-cart.svg'}
                />
              </div>
            </div>
          </div>
          <div
            className=" fixed cursor-pointer md:hidden left-3"
            onClick={toggleMenu}
          >
            <Image
              src="/menu-icon.svg"
              alt="Menu Icon"
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
        <div className="flex items-center justify-between p-4">
          <Image
            alt="Logo iaca"
            src={'/iaça-logo.svg'}
            height={60}
            width={60}
          />
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
            <div className="mb-10">
              <a
                href="#"
                className={`text-base text-center ${Nunitofont.className}`}
              >
                Menu
              </a>
            </div>
          </li>
          <li className="mb-4">
            <a href="#" className={`text-base ${Nunitofont.className}`}>
              Sobre o ÍAÇA
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
