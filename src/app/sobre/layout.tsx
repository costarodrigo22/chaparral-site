import type { Metadata } from 'next';
import { Libre_Franklin } from 'next/font/google';

const libreFranklin = Libre_Franklin({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sobre ÍAÇA puro',
  description: '',
};

export default function SobreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${libreFranklin.className}`}>{children}</body>
    </html>
  );
}
