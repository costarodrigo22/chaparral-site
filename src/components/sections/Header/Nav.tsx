'use client';

import { useState } from 'react';
import { getFirstAndLastname, getInitials, handleScroll } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import ModalContacts, { IData } from '../Footer/components/ModalContacts';
import Image from 'next/image';
import shopCart from '../../../../public/shopping-cart.svg';
import { useCart } from '@/contexts/Cart/CartContext';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { LogOut, ShoppingBag, UserPen } from 'lucide-react';
import { localStorageKeys } from '@/config/localStorageKeys';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface NavProps {
  company: IData;
  logoImage: string;
  session: {
    email: string;
    id: string;
    name: string;
    token: string;
  };
  onLogOut: () => Promise<void>;
}

export default function Nav({
  company,
  logoImage,
  session,
  onLogOut,
}: NavProps) {
  const [openContactsModal, setOpenContactsModal] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const route = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { quantityItemCart, resetCart } = useCart();

  const { userLogged } = useAuth();

  async function handleLogOut() {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem('local_delivery');
    localStorage.removeItem('type_receipt');
    localStorage.removeItem('freight');

    resetCart();

    await onLogOut();
  }

  return (
    <>
      <ModalContacts
        data={company || {}}
        onClose={() => setOpenContactsModal(false)}
        open={openContactsModal}
      />
      <nav className="w-full h-[90px] fixed flex z-50 bg-gradient-to-r from-[#2B0036] to-[#36133D] text-white">
        <div className="flex items-center justify-center w-[15%]">
          <a
            href="/"
            className="cursor-pointer relative hidden md:block max-w-[139px] h-auto mt-5"
          >
            {logoImage && (
              <Image src={logoImage} alt="Logo" width={110} height={80} />
            )}
          </a>
        </div>
        <div className="flex items-center justify-between w-[85%] mt-4">
          <div className="flex items-center md:gap-[65px] lg:gap-[80px] xl:gap-[90px]">
            <a href="/sobre" className="font-bold text-base hidden md:block">
              Sobre o ÍAÇA
            </a>

            {pathname === '/' && (
              <span
                className="hover:cursor-pointer font-bold text-base hidden md:block"
                onClick={() => handleScroll('Quero comprar')}
              >
                Quero comprar
              </span>
            )}

            {pathname !== '/' && (
              <a
                href="/product/11"
                className="hover:cursor-pointer font-bold text-base hidden md:block"
              >
                Quero comprar
              </a>
            )}
            <a href={'/recipes'}>
              <span className="hover:cursor-pointer font-bold text-base hidden md:block">
                Receitas
              </span>
            </a>
            <span
              className="font-bold text-base cursor-pointer hidden md:block"
              onClick={() => setOpenContactsModal(true)}
            >
              Contato
            </span>
          </div>

          <div className="flex items-center justify-center mr-14">
            {!session?.token && (
              <span
                onClick={() => route.push('/sign-in')}
                className="font-bold text-base cursor-pointer hidden md:block hover:underline transition-all"
              >
                Entrar
              </span>
            )}
            <div className="relative flex items-center gap-[71px] lg:mr-2 xl:mr-2">
              <a
                href="/cart"
                className="w-12 h-12 rounded-full md:static right-3 bg-transparent flex items-center justify-center hover:bg-[#3b1344a1] transition-all duration-300 ease-in-out cursor-pointer"
              >
                {quantityItemCart > 0 && (
                  <div className="absolute bg-white w-[18px] h-[18px] rounded-full flex items-center justify-center top-0 right-0">
                    <span className="text-black text-[12px] font-semibold">
                      {quantityItemCart}
                    </span>
                  </div>
                )}
                <Image
                  alt="Carrinho de compras"
                  height={24}
                  width={24}
                  src={shopCart}
                />
              </a>
            </div>
            <div
              className="fixed cursor-pointer md:hidden left-3"
              onClick={toggleMenu}
            >
              <Image
                src="/menu-icon.svg"
                alt="Menu Icon"
                width={25}
                height={25}
              />
            </div>
            {session?.token && (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="ml-6">
                    <AvatarImage src={userLogged.avatarUrl} />
                    <AvatarFallback className="text-black font-semibold">
                      {getInitials(userLogged.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <span className="ml-2 hidden lg:block">
                  {getFirstAndLastname(userLogged.name)}
                </span>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => route.push('/profile')}
                    className="cursor-pointer hover:bg-slate-100 transition-all"
                  >
                    <UserPen width={16} className="mr-2" />
                    Perfil
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-100 transition-all"
                    onClick={() => route.push('/orders')}
                  >
                    <ShoppingBag width={16} className="mr-2" />
                    Meus pedidos
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-100 hover:text-[#FF3737] transition-all text-[#FF3737]"
                    onClick={() => handleLogOut()}
                  >
                    <LogOut width={16} className="mr-2" stroke="#FF3737" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-[250px] h-full bg-[#2B0036] text-white transition-transform duration-300 z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-[-110%]'
        } md:hidden`}
      >
        <div className="flex items-center justify-between p-4">
          <a href="/">
            <Image
              alt="Logo iaca"
              src={'/iaça-logo.svg'}
              height={60}
              width={60}
            />
          </a>
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
              <a href="#" className="text-base text-center">
                Menu
              </a>
            </div>
          </li>
          <li className="mb-4">
            <a href="/sobre" className="text-base">
              Sobre o ÍAÇA
            </a>
          </li>
          <li className="mb-4">
            <span
              onClick={() => handleScroll('Quero comprar')}
              className="text-base"
            >
              Quero comprar
            </span>
          </li>
          <li className="mb-4">
            <a href={'/recipes'}>
              <span className="text-base">Receitas</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              onClick={() => setOpenContactsModal(true)}
              className="text-base cursor-pointer"
            >
              Contato
            </a>
          </li>
          <li>
            {!session?.token && (
              <span
                onClick={() => route.push('/sign-in')}
                className="font-bold text-base cursor-pointer hover:underline transition-all"
              >
                Entrar
              </span>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
