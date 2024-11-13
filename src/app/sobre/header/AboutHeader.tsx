'use client';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/axiosInstance';
import DOMPurify from 'dompurify';
import React, { useCallback, useEffect, useState } from 'react';

export default function AboutHeader() {
  const [about, setAbout] = useState<AboutInfo>();
  const [isLoading, setIsLoading] = useState(true);

  interface AboutInfo {
    data: {
      id: string;
      title: string;
      description: string;
      featured_image: string;
      created_at: string;
      updated_at: string;
      base64: string;
    };
  }

  const handleGetAboutInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get<AboutInfo>('/api/without/about_header/get');
      console.log(res);
      setAbout(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetAboutInfo();
  }, [handleGetAboutInfo]);

  return (
    <header>
      <div className="h-[89px]"></div>
      {isLoading ? (
        <div className="w-full h-auto flex flex-col gap-[160px]">
          <Skeleton className="w-full h-[300px] lg:h-[600px] bg-slate-300 flex flex-col items-start justify-center px-10 gap-6">
            <Skeleton className="h-10 w-1/2 bg-slate-400" />
            <Skeleton className="max-w-[648px] h-20 w-full bg-slate-400" />
          </Skeleton>
        </div>
      ) : about ? (
        <div
          style={{
            backgroundImage: `url(${about?.data.base64})`,
            aspectRatio: 2.27,
            backgroundSize: '100%',
            backgroundPosition: 'center 0',
            backgroundRepeat: 'no-repeat',
          }}
          className="w-full text-white flex h-auto flex-col gap-[160px]"
        >
          <div className="xl:ml-[85px] lg:ml-[55px] sm:ml-[30px] sm:text-left text-center pt-3 flex flex-col gap-3 sm:gap-6 xl:gap-8 sm:mt-[30px] md:mt-[90px] lg:mt-[110px] xl:mt-[130px] 2xl:mt-[200px]">
            <h1
              className="font-bold text-xl md:text-2xl xl:text-4xl"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(about?.data.title),
              }}
            ></h1>
            <h2
              className="max-w-[648px] text-xs md:text-base font-medium xl:text-lg"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(about?.data.description),
              }}
            ></h2>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
}
