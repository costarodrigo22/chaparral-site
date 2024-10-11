import Image from 'next/image';
import Footer from '../components/Footer';
import AboutHeader from './_components/AboutHeader';

export default function Sobre() {
  return (
    <div className="w-full h-full">
      <AboutHeader />

      <div className=" lg:mx-8">
        <Footer />
      </div>
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
