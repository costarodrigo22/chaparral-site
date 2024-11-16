'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import CityCarousel from './CityCarousel';
import api from '@/lib/axiosInstance';

interface CarrouselItem {
  id: string;
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  cep: string;
  uf: string;
  telephone_number: string;
  base64: string;
}
interface CarrouselInfo {
  data: CarrouselItem[];
}

export default function FindUs() {
  const [carrouselItems, setCarrouselItems] = useState<CarrouselItem[]>([]);
  const handleGetCarrouselInfo = useCallback(async () => {
    try {
      const res = await api.get<CarrouselInfo>(
        '/api/without/partners/last_five_partners'
      );
      setCarrouselItems(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    handleGetCarrouselInfo();
  }, [handleGetCarrouselInfo]);
  return (
    <div className="mt-[89px]">
      <div className="flex items-center gap-7 justify-center md:justify-start md:pl-12 xl:pl-20">
        <Image
          alt="Ícone de pin"
          height={65}
          width={57}
          src={'/pin-icon.svg'}
        />
        <span className=" text-black font-semibold text-lg sm:text-2xl">
          Saiba onde nos encontrar
        </span>
      </div>
      <div className="mt-28 flex items-center justify-center mx-0 lg:mx-16 xl:mx-20">
        <CityCarousel items={carrouselItems} />
      </div>
    </div>
  );
}
