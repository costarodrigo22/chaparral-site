"use client";

import Image from "next/image";
import whatsapp from "../../../../public/whatsapp-icon.svg";
import { Button } from "@/components/ui/Button";

export default function PickUpWhatsApp() {
  function handleRedirect() {
    window.open(`https://wa.me/99991196675`, "_blank");
  }

  return (
    <div className="w-full px-6 py-6 shadow-md rounded-md">
      <div className="flex items-center gap-3">
        <Image src={whatsapp} alt="Imagem whatsapp" width={30} height={30} />

        <div className="flex flex-col">
          <span className="font-medium text-base">Dúvida sobre a entrega?</span>
          <span className="text-sm text-[#898989]">
            Mande uma mensagem no nosso WhatsApp
          </span>
        </div>

        <Button
          onClick={handleRedirect}
          className="bg-[#08964F] text-[#fff] w-[134px] h-[34] rounded-full hover:bg-[#43b97e] transition-all"
        >
          Conversar
        </Button>
      </div>
    </div>
  );
}
