'use client';
import Image from 'next/image';
import React from 'react';
import Button from '@/components/ui/Button/index';
import { IData } from '../sections/Footer/components/ModalContacts';

interface companyData {
  companyData: IData;
}

export default function WhatsappCard({ companyData }: companyData) {
  return (
    <article className="flex border flex-col items-center justify-center md:flex-row border-[#E4E7E9] py-3 px-5 gap-4 rounded-xl">
      <div className="flex items-center gap-4">
        <Image
          alt="Logo do whatsapp"
          src="/whatsapp-icon.svg"
          height={31}
          width={31}
        />
        <div className="flex flex-col">
          <span className="text-black font-medium text-base">
            Continuar no WhatsApp
          </span>
          <span className=" text-lightGray font-medium text-sm">
            Mande uma mensagem no nosso WhatsApp
          </span>
        </div>
      </div>
      <Button
        text="Conversar"
        classNameCustom="bg-[#08964F] text-white h-[45px] w-[170px] md:ml-11"
        classNameText="text-base font-medium"
        src="/arrow-right.svg"
        onClick={() => window.open(companyData.whatsapp, '_blank')}
      />
    </article>
  );
}
