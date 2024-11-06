'use client';
import Button from '@/components/ui/Button/index';
import api from '@/lib/axiosInstance';
import { useEffect, useState, useCallback } from 'react';
import { ClipLoader } from 'react-spinners';
import DOMPurify from 'dompurify';
import { getColors } from '@/lib/utils';

interface DataItem {
  id: string;
  title: string;
  description: string;
  background_image: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: DataItem[];
}

export default function OwnProduction() {
  const [info, setInfo] = useState<DataItem | undefined>(undefined);
  const [image, setImage] = useState('');
  const [titleColor, setTitleColor] = useState('');

  const GetOwnProductionData = useCallback(async () => {
    try {
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
    }
  }, []);

  useEffect(() => {
    GetOwnProductionData();
  }, [GetOwnProductionData]);

  useEffect(() => {
    if (info) {
      setTitleColor(getColors(info.title) || 'inherit');
    }
    console.log(
      'info:',
      info,
      'infoTitle:',
      info?.title,
      'retorno',
      titleColor
    );
  }, [info]);

  return (
    <>
      {info && image ? (
        <section
          className="flex xl:pl-44 pl-6 md:gap-16 lg:gap-20 w-full items-center justify-start"
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
            <Button
              onClick={() => {
                window.open('/sobre', '_self');
              }}
              style={{ color: titleColor }} // Aplica a cor RGB aqui
              text="Saiba mais"
              classNameCustom="bg-[#FFFFFF33] hover:bg-[#FFFFFF20]"
              src="/arrow-right.svg"
            ></Button>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center w-full h-40">
          <ClipLoader size={40} color="#f00" />
        </div>
      )}
    </>
  );
}
