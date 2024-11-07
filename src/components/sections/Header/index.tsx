'use client';
import api from '@/lib/axiosInstance';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';

export default function Header() {
  const [headerImage, setHeaderImage] = useState('');
  const [logoImage, setLogoImage] = useState('');

  async function getHeaderData() {
    const headerImage = await api.get(
      '/api/without/home_header/display_image/featured_image'
    );
    const logoImage = await api.get(
      '/api/without/home_header/display_image/featured_image'
    );
    setHeaderImage(headerImage.data);
    setLogoImage(logoImage.data);
  }

  useEffect(() => {
    getHeaderData();
  }, []);

  return (
    <div className="flex flex-col ">
      <Nav />
      {headerImage && logoImage ? (
        <div className="w-full mt-[89px] text-white flex h-full flex-col">
          <Image src={headerImage} width={1600} height={799} alt="" />
        </div>
      ) : (
        <div className="mt-48 w-full flex items-center justify-center">
          <ClipLoader size={40} color="#f00" />
        </div>
      )}
    </div>
  );
}
