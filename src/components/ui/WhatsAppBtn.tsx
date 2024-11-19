'use client';
import Image from 'next/image';
import React from 'react';

export default function WhatsAppBtn({ link }: { link: string }) {
  return (
    <div className="w-full h-full relative">
      <Image
        className="z-50 hover:cursor-pointer right-1 bottom-[25px] fixed animate-shakeWithPause"
        src="/whatsapp-icon.svg"
        alt="Ícone do whatsapp"
        onClick={() => window.open(link, '_blank')}
        width={70}
        height={70}
      />
    </div>
  );
}
