import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/Sonner";
import api from "@/lib/axiosInstance";
import WhatsAppBtn from "@/components/ui/WhatsAppBtn";
import { auth, signOut } from "@/lib/auth";
import Nav from "@/components/sections/Header/Nav";
import ClientLayout from "@/components/sections/Cart/ClientLayout";
import DeliveryProvider from "@/contexts/Cart/DeliveryContext";

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

  const isAuthenticated = Boolean(session?.user?.token);

  const userValue = {
    email: session?.user?.email || "",
    id: session?.user?.id || "",
    name: session?.user?.name || "",
    token: session?.user?.token || "",
  };

  async function handleLogOut() {
    "use server";

    await signOut({
      redirectTo: "/",
    });
  }

  return (
    <html lang="pt-br">
      <body>
        <ClientLayout
          session={session}
          isAuthenticated={isAuthenticated}
          token={session?.user?.token}
          user={userValue}
        >
          <DeliveryProvider>
            <Nav
              company={companyRes.data.data}
              logoImage={logoImage.data}
              session={userValue}
              onLogOut={handleLogOut}
            />
            {children}
            <div className="lg:mx-8">
              <Footer company={companyRes.data.data} />
            </div>
            <WhatsAppBtn link={CompanyInfoRes?.data?.data?.whatsapp} />
            <Toaster />
          </DeliveryProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
