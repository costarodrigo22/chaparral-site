'use client';
import React, { useCallback, useEffect, useState } from 'react';
import MissionCard from './_components/MissionCard';
import api from '@/lib/axiosInstance';
import DOMPurify from 'dompurify';
import { Skeleton } from '@/components/ui/skeleton';

interface MissionInfo {
  data: {
    id: string;
    featured_description: string;
    mission_description: string;
    values_description: string;
    created_at: string;
    updated_at: string;
  };
}

export default function Mission() {
  const [isLoading, setIsLoading] = useState(true);
  const [mission, setMission] = useState<MissionInfo>();

  const handleGetSustaintabilityInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get<MissionInfo>(
        '/api/without/about_mission_and_values/get'
      );
      console.log(res);
      setMission(res.data);
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
    <section className="bg-primaryWhite py-28 lg:px-24 md:px-10 xl:px-48 w-full h-auto flex flex-col gap-11">
      {isLoading ? (
        <>
          <Skeleton className="text-center w-full flex flex-col gap-7 items-center justify-center px-5 sm:px-0 bg-slate-200">
            <Skeleton className="max-w-[879px] h-5" />
            <Skeleton className="max-w-[879px] h-5" />
          </Skeleton>
          <Skeleton className="flex flex-col md:flex-row gap-12 items-center justify-center bg-slate-200">
            <Skeleton className=" w-[350px] sm:w-[500px] h-[310px] rounded-[20px] bg-slate-300 pl-10 pt-10 flex flex-col gap-12 pr-2"></Skeleton>
            <Skeleton className=" w-[350px] sm:w-[500px] h-[310px] rounded-[20px] bg-slate-300 pl-10 pt-10 flex flex-col gap-12 pr-2"></Skeleton>
          </Skeleton>
        </>
      ) : mission ? (
        <>
          <div className="text-center w-full flex flex-col gap-7 items-center justify-center px-5 sm:px-0">
            <h1 className="max-w-[879px] font-semibold text-2xl sm:text-4xl text-darkGray">
              Nossa missão e valores
            </h1>
            <h2
              className="max-w-[879px] font-medium text-base sm:text-lg text-lightGray"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(mission?.data.featured_description),
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <MissionCard
              src={'./target-icon.svg'}
              text={mission?.data.mission_description}
              title="Missão"
            />
            <MissionCard
              src={'./medal-icon.svg'}
              text={mission?.data.values_description}
              title="Valores"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
