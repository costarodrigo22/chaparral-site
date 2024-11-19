'use client';

interface GenericCardProps {
  src: string;
  linkText: string;
  link: string;
  title: string;
  text: string;
}
export default function GenericCard({
  src,
  linkText,
  link,
  title,
  text,
}: GenericCardProps) {
  return (
    <div className="max-w-[365px] flex items-start gap-[20px]">
      <div>
        <img alt="ícone do card" height={98} width={56} src={src} />
      </div>
      <div className="pt-[5px] flex flex-col gap-[18px]">
        <div className="max-w-[289px] flex flex-col gap-2">
          <h3 className="text-darkPurple font-bold text-lg">{title}</h3>
          <span className="text-lightGray font-normal text-base">{text}</span>
        </div>
        <div className="w-auto">
          <span
            className="relative text-pastelBlue font-semibold text-sm cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-pastelBlue after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => {
              window.open(link, '_self');
            }}
          >
            {linkText}
          </span>
        </div>
      </div>
    </div>
  );
}
