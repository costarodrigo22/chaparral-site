"use client";

import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/Separator";
import { useCallback, useEffect, useState } from "react";
import UpdateAddress from "./UpdateAddress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { House, MapPin, Phone, Timer } from "lucide-react";
import axios from "axios";

interface IDataClientProps {
  razao_social: string;
  endereco: string;
  endereco_numero: string;
  bairro: string;
  estado: string;
  cidade: string;
  complemento: string;
}

interface ILocalPickup {
  id: string;
  name: string;
  street: string;
  number: string;
  telephone_number: string;
}

export default function DeliveryOrPickupSelector() {
  const [selection, setSelection] = useState("");
  const [localPickUp, setLocalPickUp] = useState("");
  const [openModalUpdateAddress, setOpenModalUpdateAddress] = useState(false);
  const [dataClient, setDataClient] = useState<IDataClientProps>();
  const [localPickupOptions, setLocalPickupOptions] = useState<ILocalPickup[]>(
    []
  );
  const [selectedLocalDetails, setSelectedLocalDetails] =
    useState<ILocalPickup>({} as ILocalPickup);

  const cpf_client = localStorage.getItem("cpf_client");

  function handleCloseModalUpdateAddress() {
    setOpenModalUpdateAddress(false);
  }

  function handleOpenModalUpdateAddress() {
    setOpenModalUpdateAddress(true);
  }

  function handleSelectDelivery(value: string) {
    if (value === "Entrega") {
      localStorage.removeItem("type_receipt");

      localStorage.removeItem("local_delivery");
    }

    setSelection(value);

    setLocalPickUp("");
  }

  async function handleSelectLocalPickUpChange(value: string) {
    setLocalPickUp(value);

    localStorage.setItem("type_receipt", JSON.stringify(value));

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/without/pick_up_location/find_by_id/${value}`
      );

      localStorage.setItem(
        "local_delivery",
        JSON.stringify(response.data.data)
      );

      setSelectedLocalDetails(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do local de retirada:", error);
    }
  }

  async function handleLocalPickUpOptions() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/without/pick_up_location/get_all`
      );

      setLocalPickupOptions(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar opções de locais de retirada:", error);
    }
  }

  const handleGetDataClient = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/without/omie/filter_client`,
        {
          cnpj_cpf: cpf_client,
        }
      );

      setDataClient({
        bairro: response.data.bairro,
        cidade: response.data.cidade,
        complemento: response.data.complemento,
        endereco: response.data.endereco,
        endereco_numero: response.data.endereco_numero,
        estado: response.data.estado,
        razao_social: response.data.razao_social,
      });
    } catch (error) {}
  }, [cpf_client]);

  useEffect(() => {
    handleLocalPickUpOptions();

    handleGetDataClient();
  }, [handleGetDataClient]);

  return (
    <>
      <UpdateAddress
        open={openModalUpdateAddress}
        razao_social={dataClient?.razao_social || ""}
        onClose={handleCloseModalUpdateAddress}
        onUpdateAddress={handleGetDataClient}
      />

      <div className="flex">
        <div className="w-full">
          <RadioGroup
            className="flex flex-col space-y-1"
            onValueChange={handleSelectDelivery}
          >
            <div className="rounded-md border p-5">
              <RadioGroupItem value="Entrega" id="option-one" />
              <Label
                className="ml-2 text-base font-medium"
                htmlFor="option-one"
              >
                Entrega
              </Label>
              {selection === "Entrega" && (
                <div className="w-full px-10 py-4">
                  <span>
                    {dataClient?.endereco}, {dataClient?.endereco_numero},{" "}
                    {dataClient?.bairro}, {dataClient?.cidade},{" "}
                    {dataClient?.estado} {dataClient?.complemento}
                  </span>

                  <Separator className="my-4" />

                  <span
                    onClick={handleOpenModalUpdateAddress}
                    className="text-[#16A6FF] text-base cursor-pointer hover:underline transition-all"
                  >
                    Atualizar endereço
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-md border p-5">
              <RadioGroupItem value="Retirada" id="option-two" />
              <Label
                className="ml-2 text-base font-medium"
                htmlFor="option-two"
              >
                Retirada
              </Label>
              <div>
                {selection === "Retirada" && (
                  <div className="w-full py-4">
                    <Label className="text-base font-medium">
                      Retire seu produto na loja*
                    </Label>
                    <Select
                      value={localPickUp}
                      onValueChange={handleSelectLocalPickUpChange}
                    >
                      <SelectTrigger className="" id="type-profile">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {localPickupOptions?.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {!localPickUp && (
                      <div className="mt-5 flex flex-col gap-2 text-sm items-center opacity-70">
                        <span>Selecione um local de retirada 😉</span>
                      </div>
                    )}

                    {selectedLocalDetails && localPickUp && (
                      <div className="mt-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <House size={22} />

                          <span className="text-base font-medium">
                            {selectedLocalDetails.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin color="#898989" size={22} />

                          <span className="text-[12px] text-[#898989]">
                            {selectedLocalDetails.street},{" "}
                            {selectedLocalDetails.number}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone color="#898989" size={22} />

                          <span className="text-[12px] text-[#898989]">
                            {selectedLocalDetails.telephone_number}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Timer color="#898989" size={22} />

                          <span className="text-[12px] text-[#898989]">
                            Seg a Sex 08:00 às 18:00, Sáb 08:00 às 12:00 e Dom
                            Fechada
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
}
