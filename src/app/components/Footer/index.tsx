'use client';
import Button from '@/app/global/components/button';
import { handleScroll } from '@/app/utils/handleScroll';
import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-mediumWhite rounded-t-[30px] md:gap-5 flex flex-col md:flex-row items-center pl-4 md:pl-4 xl:pl-14 pt-12 pb-7 ">
      <div className="flex flex-col gap-[30px] items-center md:items-start">
        <Image
          alt="logo Íaça"
          width={98}
          height={56}
          src={'/logo-iaca-purple.svg'}
        />
        <span className="text-[#5B5B5B] font-normal text-base md:text-left text-center">
          Tem alguma dúvida? <br />
          Nossa equipe está aqui para te atender :)
        </span>
        <div>
          <Button src="/arrow-right.svg" text="Contato" />
        </div>
        <span className="text-[#5B5B5B] font-medium text-base">
          Siga nossas redes sociais:
        </span>
        <div className="flex gap-6 items-center">
          <Image
            alt="logo instagram"
            src={'/instagram-logo.svg'}
            onClick={() => {
              window.open('https://www.instagram.com/iacapuro/', '_blank');
            }}
            height={25}
            width={27}
            className="hover:cursor-pointer"
          />
          <Image
            alt="logo facebook"
            src={'/facebook-logo.svg'}
            height={25}
            width={27}
          />
        </div>
      </div>
      <div className="flex gap-10 md:gap-16 md:pl-10 lg:pl-24 xl:gap-28 xl:pl-60 pt-7 flex-col sm:flex-row items-start">
        <div className="flex gap-10 md:gap-16 xl:gap-28">
          <div className="flex flex-col gap-4">
            <h3 className="text-darkPurple font-bold text-xl">ÍAÇA</h3>
            <a href="/sobre" className="text-darkPurple text-base font-normal">
              Sobre a Empresa
            </a>
            <span
              className="text-darkPurple hover:cursor-pointer text-base font-normal"
              onClick={() => handleScroll('foodservice')}
            >
              Food Service
            </span>
            <span className="text-darkPurple text-base font-normal">
              Sustentabilidade
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-darkPurple font-bold text-xl">Contato</h3>
            <span className="text-darkPurple text-base font-normal">
              Fale com a ÍAÇA
            </span>
            <span className="text-darkPurple text-base font-normal">
              Seja parceiro
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-darkPurple font-bold text-xl">
            Ética e Privacidade
          </h3>
          <span className="text-darkPurple text-base font-normal">
            Privacidade
          </span>
          <span className="text-darkPurple text-base font-normal">
            Códigos e Políticas
          </span>
          <span className="text-darkPurple text-base font-normal">
            Denuncie Aqui
          </span>
        </div>
      </div>
    </footer>
  );
}
