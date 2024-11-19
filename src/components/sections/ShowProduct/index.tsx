'use client';
import Image from 'next/image';
import React from 'react';

export default function ShowProduct() {
  // // const [isVisible, setIsVisible] = useState(false);
  // const triggerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const entry = entries[0];
  //       // setIsVisible(entry.isIntersecting);
  //     },
  //     {
  //       threshold: 1, // 100% da div trigger visível
  //       rootMargin: '0px', // Sem margem
  //     }
  //   );

  //   if (triggerRef.current) {
  //     observer.observe(triggerRef.current);
  //   }

  //   return () => {
  //     if (triggerRef.current) {
  //       observer.unobserve(triggerRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div className="h-[800px] bg-darkPurple flex items-center justify-between flex-col lg:flex-row w-full group/showproduct overflow-hidden relative">
      {/* Div que serve como gatilho para ativar o IntersectionObserver */}
      <div
        // ref={triggerRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0"
      ></div>

      {/* Conteúdo visual */}
      <div className="h-full relative overflow-hidden flex justify-end items-end ml-[-200px]">
        <Image
          // className={`hidden lg:block transition-transform duration-[1200ms] ${
          //   isVisible ? '-rotate-[39deg]' : ''
          // }`}
          alt="Image de visualização de produto"
          height={400}
          width={500}
          src={'product-left.svg'}
        />
      </div>

      <div className="h-full relative z-10 flex items-center justify-center mt-14">
        <Image
          // className={`transition-transform duration-[1200ms] ${
          //   isVisible ? 'transform scale-125' : ''
          // }`}
          alt="Image de visualização de produto"
          height={555}
          width={422}
          src={'product-acai.svg'}
        />
      </div>

      <div className="h-full relative overflow-hidden flex justify-start items-start mr-[-200px]">
        <Image
          // className={`hidden lg:block transition-transform duration-[1200ms] ${
          //   isVisible ? 'rotate-[39deg]' : ''
          // }`}
          alt="Image de visualização de produto"
          height={400}
          width={500}
          src={'product-right.svg'}
        />
      </div>
    </div>
  );
}
