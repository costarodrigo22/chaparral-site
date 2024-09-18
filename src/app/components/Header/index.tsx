'use client';
import Nav from './Nav';

export default function Header() {
  return (
    <div
      style={{
        backgroundImage: 'url(/fundo-roxo-header.svg)',
        aspectRatio: 1.9,
        backgroundSize: '100%',
        backgroundPosition: 'center 0',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-full text-white flex h-auto flex-col"
    >
      <Nav />
    </div>
  );
}
