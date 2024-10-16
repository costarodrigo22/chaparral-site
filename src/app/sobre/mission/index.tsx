import React from 'react';
import MissionCard from './_components/MissionCard';

export default function Mission() {
  return (
    <section className="bg-primaryWhite py-28 lg:px-24 md:px-10 xl:px-48 w-full h-auto flex flex-col gap-11">
      <div className="text-center w-full flex flex-col gap-7 items-center justify-center px-5 sm:px-0">
        <h1 className="max-w-[879px] font-semibold text-2xl sm:text-4xl text-darkGray">
          Nossa missão e valores
        </h1>
        <h2 className="max-w-[879px] font-medium text-base sm:text-lg text-lightGray">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and `}</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
        <MissionCard
          src={'./target-icon.svg'}
          text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took `}
          title="Missão"
        />
        <MissionCard
          src={'./medal-icon.svg'}
          text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took `}
          title="Valores"
        />
      </div>
    </section>
  );
}
