import type { Metadata } from 'next';
import { Libre_Franklin } from 'next/font/google';
import './globals.css';
import Footer from '@/components/sections/Footer';
import Nav from '@/components/sections/Header/Nav';
import { Toaster } from '@/components/ui/Sonner';
import api from '@/lib/axiosInstance';
import WhatsAppBtn from '@/components/ui/WhatsAppBtn';

const libreFranklin = Libre_Franklin({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ÍAÇA puro',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyRes = await api.get('/api/without/company_profile/get');
  const logoImage = await api.get(
    '/api/without/home_header/display_image/logo'
  );
  const CompanyInfoRes = await api.get('/api/without/company_profile/get');
  return (
    <html lang="pt-br">
      <body className={`${libreFranklin.className}`}>
        <Nav company={companyRes.data.data} logoImage={logoImage.data} />

        {children}

        <div className=" lg:mx-8">
          <Footer company={companyRes.data.data} />
        </div>
        <WhatsAppBtn link={CompanyInfoRes?.data?.data?.whatsapp} />
        <Toaster />
      </body>
    </html>
  );
}
