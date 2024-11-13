'use client';
import api from '@/lib/axiosInstance';
import { useEffect, useState, useCallback } from 'react';
import DOMPurify from 'dompurify';
import { getColors } from '@/lib/utils';
import Image from 'next/image';
import MediaModal from './components/MediaModal';
import { Skeleton } from '@/components/ui/skeleton';

interface DataItem {
  id: string;
  title: string;
  description: string;
  background_image: string;
  link: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: DataItem[];
}

export default function AboutInstitutional() {
  const [info, setInfo] = useState<DataItem | undefined>(undefined);
  const [image, setImage] = useState('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [titleColor, setTitleColor] = useState('');

  const GetOwnProductionData = useCallback(async () => {
    try {
      setIsLoading(true);
      const infoRes = await api.get<ApiResponse>(
        '/api/without/home_institutional_section/index'
      );
      const imageRes = await api.get(
        '/api/without/home_institutional_section/display_image'
      );
      setInfo(infoRes.data.data[0]);
      setImage(imageRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    GetOwnProductionData();
  }, [GetOwnProductionData]);

  useEffect(() => {
    if (info) {
      setTitleColor(getColors(info.title) || 'inherit');
    }
  }, [info]);

  return (
    <>
      {isLoading ? (
        <Skeleton className="  flex h-[600px] bg-slate-200 xl:pl-44 pl-6 md:gap-16 mb-8 lg:gap-20 w-full items-center justify-start">
          <Skeleton className=" p-10 my-10 flex flex-col h-auto w-[320px] md:w-[600px] items-center md:items-start gap-3 md:gap-6 lg:gap-12 mt-0 lg:mt-14 xl:mt-24 bg-slate-300">
            <Skeleton className=" bg-slate-400 h-16 w-[300px] md:w-[400px]" />
            <Skeleton className=" bg-slate-400 h-40 w-[300px] md:w-[400px]" />
            <div className="flex gap-5 items-center">
              <Skeleton className=" rounded-full bg-slate-400 flex items-center justify-center h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]" />
              <Skeleton className=" bg-slate-400 h-10 w-[200px]" />
            </div>
          </Skeleton>
        </Skeleton>
      ) : info && image ? (
        <>
          <MediaModal
            onClose={() => setOpenModal(false)}
            open={openModal}
            link={info.link}
          />
          <section
            className="flex xl:pl-44 pl-6 md:gap-16 mb-8 lg:gap-20 w-full items-center justify-start"
            style={{
              backgroundImage: `url(${image})`,
              aspectRatio: 1.9,
              backgroundSize: '100%',
              backgroundPosition: 'center 0',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex flex-col text-center md:text-left items-center md:items-start gap-3 md:gap-6 lg:gap-12 mt-0 lg:mt-14 xl:mt-24">
              <div className="flex flex-col gap-2 lg:gap-7">
                <h3
                  className="max-w-[400px] text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold"
                  style={{ color: titleColor }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(info.title),
                  }}
                />
                <h4
                  className=" text-white max-w-[400px] xl:max-w-[500px] font-medium text-xs md:text-sm lg:text-base xl:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(info.description),
                  }}
                />
              </div>
              <div
                className="flex items-center gap-4 hover:opacity-90 cursor-pointer"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <div className=" rounded-full bg-[#D9D9D94D] flex items-center justify-center h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]">
                  <Image
                    className="ml-1"
                    src={'/playIcon.svg'}
                    alt="Ver vídeo"
                    width={14}
                    height={18}
                  />
                </div>
                <span
                  style={{ color: titleColor }}
                  className=" text-base md:text-lg lg:text-xl font-semibold"
                >
                  Assistir Vídeo
                </span>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className=""></div>
      )}
    </>
  );
}
