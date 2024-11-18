'use client';
import Image from 'next/image';
import AboutHeader from './header/AboutHeader';
import Sustainability from './sustainabilitySection';
import Mission from './mission';
import AboutInstitutional from '@/components/sections/AboutInstitutional';
import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/axiosInstance';
import { IData } from '@/components/sections/Footer/components/ModalContacts';

export default function Sobre() {
  const [companyData, setCompanyData] = useState<IData>({} as IData);
  const getCompanyData = useCallback(async () => {
    try {
      const res = await api.get('/api/without/company_profile/get');
      setCompanyData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getCompanyData();
  }, [getCompanyData]);
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
          onClick={() => window.open(companyData?.whatsapp, '_blank')}
          width={70}
          height={70}
        />
      </div>
    </div>
  );
}
