import Image from 'next/image';

interface MissionCardProps {
  src: string;
  title: string;
  text: string;
}

export default function MissionCard({ src, title, text }: MissionCardProps) {
  return (
    <article className=" w-[350px] sm:w-[500px] h-[310px] rounded-[20px] bg-white pl-10 pt-10 flex flex-col gap-12 pr-2">
      <div className="flex gap-6 items-center">
        <Image alt="Ícone de" src={src} height={52} width={52} />
        <h3 className=" font-semibold text-3xl text-darkGray">{title}</h3>
      </div>
      <span className="text-lightGray text-base font-medium">{text}</span>
    </article>
  );
}
