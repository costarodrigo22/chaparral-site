'use client';
import Button from '@/components/ui/Button/index';
import api from '@/lib/axiosInstance';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import DOMPurify from 'dompurify';

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
  const [info, setInfo] = useState<DataItem | undefined>(undefined);
  const [image, setImage] = useState('');

  async function GetFoodServiceInfo() {
    try {
      const infoResponse = await api.get<ApiResponse>(
        '/api/without/home_be_a_partner_section/index'
      );
      const imageResponse = await api.get(
        '/api/without/home_be_a_partner_section/display_image'
      );
      setInfo(infoResponse.data.data[0]); // Assume que o primeiro item é o desejado
      setImage(imageResponse.data); // Armazena a imagem em base64
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  useEffect(() => {
    GetFoodServiceInfo();
  }, []);

  return (
    <>
      {info ? (
        <div
          className="bg-mediumWhite flex justify-between w-full h-[629px] 2xl:h-[800px]"
          id="foodservice"
        >
          <div className="px-20 flex items-center lg:items-start bg-[url('/food-service-bg.svg')] bg-no-repeat bg-center bg-cover justify-center flex-col gap-[75px] py-5 w-full lg:w-[56.32%]">
            <h2 className="font-normal text-2xl 2xl:text-4xl sm:text-3xl md:text-4xl">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(info.title),
                }}
              />
            </h2>
            <span className="font-normal text-sm 2xl:text-lg max-w-[630px]">
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
            />
          </div>
          <div
            className="w-[43.68%] hidden lg:block h-auto bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        </div>
      ) : (
        <div className="w-full flex h-40 items-center justify-center">
          <ClipLoader size={40} color="#f00" />
        </div>
      )}
    </>
  );
}
