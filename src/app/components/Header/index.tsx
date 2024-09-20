'use client';
import Nav from './components/Nav';

export default function Header() {
  return (
    <div className="flex flex-col ">
      <Nav />
      <div
        style={{
          backgroundImage: 'url(/fundo-roxo-header.svg)',
          aspectRatio: 1.9,
          backgroundSize: '100%',
          backgroundPosition: 'center 0',
          backgroundRepeat: 'no-repeat',
        }}
        className="w-full mt-[89px] text-white flex h-auto flex-col"
      ></div>
    </div>
  );
}
