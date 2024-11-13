'use client';
import Button from '@/components/ui/Button/index';
import api from '@/lib/axiosInstance';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import BeAPartnerModal from './components/BeAPartnerModal';
import { Skeleton } from '@/components/ui/skeleton';

interface DataItem {
  id: string;
  title: string;
  description: string;
  featured_image: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: DataItem[];
}

export default function FoodService() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<DataItem | undefined>(undefined);
  const [image, setImage] = useState('');

  async function GetFoodServiceInfo() {
    try {
      setIsLoading(true);
      const infoResponse = await api.get<ApiResponse>(
        '/api/without/home_be_a_partner_section/index'
      );
      const imageResponse = await api.get(
        '/api/without/home_be_a_partner_section/display_image'
      );
      setInfo(infoResponse.data.data[0]);
      setImage(imageResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetFoodServiceInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full  h-[629px] 2xl:h-[800px] flex justify-between bg-slate-300">
          <Skeleton className="sm:px-10 px-5 lg:px-20 flex items-center lg:items-start bg-no-repeat bg-center bg-cover justify-center flex-col gap-[70px] py-5 w-full lg:w-[56.32%]">
            <Skeleton className=" bg-slate-500 h-10 w-[40%] lg:w-[70%]" />
            <Skeleton className=" bg-slate-500 h-40 w-[70%]" />
            <Skeleton className=" bg-slate-500 h-10 w-[30%] rounded-full" />
          </Skeleton>
          <Skeleton className="w-[43.68%] hidden lg:block h-full bg-slate-400" />
        </Skeleton>
      ) : info ? (
        <>
          <BeAPartnerModal
            onClose={() => setOpenModal(false)}
            open={openModal}
          />
          <div
            className="bg-mediumWhite flex justify-between w-full h-[629px] 2xl:h-[800px]"
            id="foodservice"
          >
            <div className="sm:px-10 px-5 lg:px-20 flex items-center lg:items-start bg-[url('/food-service-bg.svg')] bg-no-repeat bg-center bg-cover justify-center flex-col gap-[30px] py-5 w-full lg:w-[56.32%]">
              <h2 className="font-normal text-2xl 2xl:text-4xl sm:text-3xl md:text-4xl">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(info.title),
                  }}
                />
              </h2>
              <span className="font-normal text-sm 2xl:text-lg max-w-[630px] text-center lg:text-left">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(info.description),
                  }}
                />
              </span>
              <Button
                src="/arrow-right.svg"
                text="Seja parceiro"
                classNameText="text-white"
                onClick={() => setOpenModal(true)}
              />
            </div>
            <div
              className="w-[43.68%] hidden lg:block h-auto bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </div>
        </>
      ) : (
        <div className="w-full flex h-40 items-center justify-center"></div>
      )}
    </>
  );
}
