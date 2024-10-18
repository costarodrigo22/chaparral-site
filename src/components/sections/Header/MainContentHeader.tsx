import Image from 'next/image';
import React from 'react';

export default function MainContentHeader() {
  return (
    <div className="flex justify-center gap-28 mt-11">
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-medium">Sabor tem nome e cor.</h1>
          <span className="text-2xl font-medium">
            E no ÍAÇA é roxo vibrante!!!
          </span>
        </div>
      </div>
      <div className="relative max-w-[600px] h-auto">
        <Image
          alt="três deliciosos açaís da Iaça!"
          src={'/tresAcai.svg'}
          layout="responsive"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
}
