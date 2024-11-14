'use client';
import api from '@/lib/axiosInstance';
import Nav from './Nav';
import { useEffect, useState, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Header() {
  const [headerImage, setHeaderImage] = useState('');

  const getHeaderData = useCallback(async () => {
    try {
      const headerImageRes = await api.get(
        '/api/without/home_header/display_image/featured_image'
      );
      setHeaderImage(headerImageRes.data);
    } catch (error) {
      console.error('Erro ao buscar dados do header:', error);
    }
  }, []);

  useEffect(() => {
    getHeaderData();
  }, [getHeaderData]);

  return (
    <div className="flex flex-col">
      <Nav />
      {headerImage ? (
        <div
          className="w-full mt-[89px] text-white flex h-full flex-col"
          style={{
            backgroundImage: `url(${headerImage})`,
            aspectRatio: 1.9,
            backgroundSize: '100%',
            backgroundPosition: 'center 0',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      ) : (
        <div className="w-full mt-[89px] text-white flex h-full flex-col">
          <Skeleton className=" bg-slate-300 h-[500px] w-full flex flex-col gap-10 justify-center px-20">
            <Skeleton className=" bg-slate-400 h-[100px]" />
            <Skeleton className=" bg-slate-400 h-[100px]" />
          </Skeleton>
        </div>
      )}
    </div>
  );
}
