import type { Metadata } from 'next';
import { Libre_Franklin } from 'next/font/google';
import './globals.css';
import Footer from '@/components/sections/Footer';
import Nav from '@/components/sections/Header/Nav';
import { Toaster } from '@/components/ui/Sonner';

const libreFranklin = Libre_Franklin({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ÍAÇA puro',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${libreFranklin.className}`}>
        <Nav />

        {children}

        <div className=" lg:mx-8">
          <Footer />
        </div>

        <Toaster />
      </body>
    </html>
  );
}
