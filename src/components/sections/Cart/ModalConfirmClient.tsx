"use client";

import { Dialog, DialogContent } from "@/components/ui/Dialog";
import Image from "next/image";
import logoIaca from "../../../../public/logo-iaca-purple.svg";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IModalConfirmClient {
  open: boolean;
  onClose: () => void;
  onOpenModalCreateAccount: () => void;
}

export default function ModalConfirmClient({
  open,
  onClose,
  onOpenModalCreateAccount,
}: IModalConfirmClient) {
  const [cpf, setCpf] = useState("");
  const [loadingConfirmCpf, setLoadingConfirmCpf] = useState(false);

  const router = useRouter();

  async function handleSearchInfosClient() {
    setLoadingConfirmCpf(true);

    const body = {
      cnpj_cpf: cpf,
    };

    localStorage.removeItem("code_client");
    localStorage.removeItem("cpf_client");
    localStorage.removeItem("email_client");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/without/omie/filter_client`,
        body
      );

      localStorage.setItem("code_client", response.data.codigo_cliente_omie);
      localStorage.setItem(
        "cpf_client",
        response.data.codigo_cliente_integracao
      );
      localStorage.setItem("email_client", response.data.email);

      router.push("/Delivery");
    } catch (error) {
    } finally {
      setLoadingConfirmCpf(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[700px] p-0">
          <div
            style={{
              backgroundImage: "url(/image-modal-confirm-client.svg)",
              aspectRatio: 2.27,
              backgroundSize: "100%",
              backgroundPosition: "center 0",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full h-[240px] relative rounded-t-md"
          ></div>

          <div className="w-full h-[240px] bg-white"></div>
          <form className="bg-white rounded-md flex items-center justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[320px] shadow-md">
            <Image src={logoIaca} alt="Logo IAÇA" width={70} height={60} />

            <span className="font-medium text-sm">
              Olá para continuar, confirme
            </span>
            <span className="font-medium text-sm">seu CPF</span>

            <div className="grid w-full px-8 items-center gap-1.5">
              <Label className="text-xs" htmlFor="cpf">
                CPF
              </Label>
              <Input
                onChange={(event) => setCpf(event.target.value)}
                id="cpf"
                placeholder="CPF"
              />
            </div>

            <span
              onClick={onOpenModalCreateAccount}
              className="text-[#16A6FF] text-xs underline cursor-pointer mt-4"
            >
              Criar meu cadastro
            </span>

            <Button
              onClick={handleSearchInfosClient}
              type="button"
              disabled={loadingConfirmCpf}
              className="bg-[#2B0036] rounded-full mt-4 w-40 hover:bg-[#421d4b]"
            >
              {loadingConfirmCpf && "Buscando..."}
              {!loadingConfirmCpf && "Confirmar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
