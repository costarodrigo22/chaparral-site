import Image from 'next/image';
import AboutHeader from './header/AboutHeader';
import Sustainability from './sustainabilitySection';
import Mission from './mission';
import AboutInstitutional from '@/components/sections/AboutInstitutional';

export default function Sobre() {
  return (
    <div className="w-full h-full">
      <AboutHeader />
      <Sustainability />
      <Mission />
      <AboutInstitutional />
      <div className="w-full h-full relative">
        <Image
          className="z-50 hover:cursor-pointer right-1 bottom-[25px] fixed animate-shakeWithPause"
          src="/whatsapp-icon.svg"
          alt="Ícone do whatsapp"
          width={70}
          height={70}
        />
      </div>
    </div>
  );
}
