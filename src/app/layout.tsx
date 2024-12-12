import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Header/Nav";
import { Toaster } from "@/components/ui/Sonner";
import api from "@/lib/axiosInstance";
import WhatsAppBtn from "@/components/ui/WhatsAppBtn";
import CartProvider from "@/contexts/Cart/CartContext";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { AuthProvider } from "@/contexts/AuthContext";

const libreFranklin = Libre_Franklin({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ÍAÇA puro",
  description: "ÍAÇA puro",
  keywords: ["íaça", "açaí", "puro", "delivery", "sobremesa"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyRes = await api.get("/api/without/company_profile/get");
  const logoImage = await api.get(
    "/api/without/home_header/display_image/logo"
  );
  const CompanyInfoRes = await api.get("/api/without/company_profile/get");

  const session = await auth();

  const userValue = {
    email: session?.user?.email || "",
    id: session?.user?.id || "",
    name: session?.user?.name || "",
    token: session?.user?.token || "",
  };

  return (
    <html lang="pt-br">
      <body className={`${libreFranklin.className}`}>
        <AuthProvider user={{ user: userValue }}>
          <CartProvider>
            <Nav company={companyRes.data.data} logoImage={logoImage.data} />
            <SessionProvider session={session}>{children}</SessionProvider>
            <div className=" lg:mx-8">
              <Footer company={companyRes.data.data} />
            </div>
            <WhatsAppBtn link={CompanyInfoRes?.data?.data?.whatsapp} />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
