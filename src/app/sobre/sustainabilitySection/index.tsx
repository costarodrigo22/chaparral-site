'use client';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/axiosInstance';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
interface SustaintabilityInfo {
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

export default function Sustainability() {
  const [isLoading, setIsLoading] = useState(true);
  const [sustaintability, setSustaintability] = useState<SustaintabilityInfo>();

  const handleGetSustaintabilityInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get<SustaintabilityInfo>(
        '/api/without/about_sub_header/get'
      );
      console.log(res);
      setSustaintability(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetSustaintabilityInfo();
  }, [handleGetSustaintabilityInfo]);

  return (
    <section className="w-full h-auto flex">
      {isLoading ? (
        <>
          <Skeleton className="h-[300px]  md:h-[500px] w-full flex">
            <Skeleton className="w-full px-10 lg:w-[68.08%] bg-slate-300 flex md:pl-[40px] xl:pl-[97px] flex-col justify-center  gap-5">
              <Skeleton className=" h-10 xl:max-w-[484px] bg-slate-400" />
              <Skeleton className=" h-20 xl:max-w-[648px] bg-slate-400" />
            </Skeleton>
            <Skeleton className="lg:w-[42.92%] hidden lg:block bg-slate-500"></Skeleton>
          </Skeleton>
        </>
      ) : sustaintability ? (
        <>
          <div className="w-full lg:w-[68.08%] bg-[#f1f5f9]">
            <div className="w-full h-[400px] xl:h-[63.21%]">
              <div className="h-full relative">
                <Image
                  className="absolute right-0 sm:right-[20%] lg:right-[10%] bottom-0 z-0"
                  alt="Figura de um broto"
                  src={'/eco-figure.svg'}
                  height={319}
                  width={501}
                />
                <div className="h-full px-2 pb-10 sm:pb-0 sm:px-0 w-full justify-center md:text-left text-center items-center md:items-start flex flex-col md:pl-[40px] xl:pl-[97px] z-10 pt-32 gap-[30px]">
                  <h1
                    className="z-10 xl:max-w-[484px] font-semibold text-2xl xl:text-4xl text-darkGray "
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(sustaintability.data.title),
                    }}
                  />
                  <h2
                    className="z-10 max-w-[600px] xl:max-w-[648px] font-medium text-lightGray text-base xl:text-lg"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        sustaintability.data.description
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full"></div>
          </div>
          <div className="lg:w-[42.92%] hidden lg:block">
            <Image
              alt="Imagem de um cacho de açaí"
              src={sustaintability.data.base64}
              height={810}
              width={618}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
