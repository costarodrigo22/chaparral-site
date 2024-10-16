import Image from 'next/image';

export default function Sustainability() {
  return (
    <section className="w-full h-auto flex">
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
              <h1 className="z-10 xl:max-w-[484px] font-semibold text-2xl xl:text-4xl text-darkGray ">
                Compromisso com a sustentabilidade
              </h1>
              <h2 className="z-10 max-w-[600px] xl:max-w-[648px] font-medium text-lightGray text-base xl:text-lg">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}</h2>
            </div>
          </div>
        </div>
        <div className="w-full"></div>
      </div>
      <div className="lg:w-[42.92%] hidden lg:block">
        <Image
          alt="Imagem de um cacho de açaí"
          src={'/sustainability-section-cacho.svg'}
          height={810}
          width={618}
        />
      </div>
    </section>
  );
}
