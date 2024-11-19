'use client';
import Nav from './Nav';

export default function Header({ image }: { image: string }) {
  return (
    <div className="flex flex-col">
      <Nav />
      <div
        className="w-full mt-[89px] text-white flex h-full flex-col"
        style={{
          backgroundImage: `url(${image})`,
          aspectRatio: 1.9,
          backgroundSize: '100%',
          backgroundPosition: 'center 0',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </div>
  );
}
