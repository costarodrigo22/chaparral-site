'use client';

import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Separator } from '@/components/ui/Separator';
import { useCallback, useEffect, useState } from 'react';
import NewAddress from './NewAddress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { House, MapPin, Phone, Timer } from 'lucide-react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  calcFreight,
  getAddress,
  getAddressSelected,
} from '@/services/address';
import { IAddressSelected, useDelivery } from '@/contexts/Cart/DeliveryContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ILocalPickup {
  id: string;
  name: string;
  street: string;
  number: string;
  telephone_number: string;
}

export default function DeliveryOrPickupSelector() {
  const [selection, setSelection] = useState('Entrega');
  const [loading, setLoading] = useState(false);
  const [localPickUp, setLocalPickUp] = useState('');
  const [openModalUpdateAddress, setOpenModalUpdateAddress] = useState(false);
  const [localPickupOptions, setLocalPickupOptions] = useState<ILocalPickup[]>(
    []
  );
  const [selectedLocalDetails, setSelectedLocalDetails] =
    useState<ILocalPickup>({} as ILocalPickup);

  const queryClient = useQueryClient();

  const route = useRouter();

  const { addressSelected, setAddressSelected, setFreight } = useDelivery();

  const { data: listAddress } = useQuery({
    queryKey: ['userListAddress'],
    queryFn: getAddress,
  });

  function handleCloseModalUpdateAddress() {
    setOpenModalUpdateAddress(false);
    queryClient.invalidateQueries({ queryKey: ['listAddress'] });
  }

  function handleChoiceOfAction() {
    if (listAddress.length === 0) {
      setOpenModalUpdateAddress(true);

      return;
    }

    route.push('/choice-address');
  }

  async function handleSelectDelivery(value: string) {
    if (value === 'Entrega') {
      setSelection('Entrega');

      localStorage.removeItem('type_receipt');

      localStorage.removeItem('local_delivery');

      queryClient.setQueryData(['getAddressSelected'], null);

      try {
        const address = await getAddressSelected();

        if (address.id) {
          setAddressSelected(address);

          const valueFreight = await calcFreight(address);

          setFreight(valueFreight.freightValue);
        }
      } catch (error) {
        toast.error(`Algo deu errado ao calcular o frete: ${error}`);
      }

      return;
    }

    setSelection('Retirada');

    setLocalPickUp('');

    queryClient.invalidateQueries({ queryKey: ['getAddressSelected'] });
  }

  async function handleSelectLocalPickUpChange(value: string) {
    setLocalPickUp(value);

    setAddressSelected({} as IAddressSelected);

    localStorage.removeItem('freight-value');

    localStorage.setItem('type_receipt', JSON.stringify(value));

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/without/pick_up_location/find_by_id/${value}`
      );

      localStorage.setItem(
        'local_delivery',
        JSON.stringify(response.data.data)
      );

      setSelectedLocalDetails(response.data.data);

      await queryClient.invalidateQueries({ queryKey: ['getAddressSelected'] });
    } catch (error) {
      console.error('Erro ao buscar detalhes do local de retirada:', error);
    } finally {
      await queryClient.invalidateQueries({ queryKey: ['getAddressSelected'] });

      setFreight(0);
    }
  }

  const handleLocalPickUpOptions = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/without/pick_up_location/get_all`
      );

      setLocalPickupOptions(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar opções de locais de retirada:', error);
    }
  }, []);

  useEffect(() => {
    handleLocalPickUpOptions();

    async function fetchAddressSelected() {
      setLoading(true);
      try {
        const addressSelected = await getAddressSelected();

        if (addressSelected) {
          setAddressSelected(addressSelected);

          const valueFreight = await calcFreight(addressSelected);

          setFreight(valueFreight.freightValue);

          localStorage.removeItem('local_delivery');
        }
      } catch (error) {
        console.error('Erro ao buscar endereço selecionado:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAddressSelected();
  }, [handleLocalPickUpOptions, setAddressSelected, setFreight]);

  return (
    <>
      <NewAddress
        open={openModalUpdateAddress}
        onClose={handleCloseModalUpdateAddress}
      />

      <div className="flex">
        <div className="w-full">
          <RadioGroup
            className="flex flex-col space-y-1"
            onValueChange={handleSelectDelivery}
            value={selection}
          >
            <div className="rounded-md border p-5">
              <RadioGroupItem value="Entrega" id="option-one" />
              <Label
                className="ml-2 text-base font-medium"
                htmlFor="option-one"
              >
                Entrega
              </Label>
              {selection === 'Entrega' && (
                <div className="w-full py-4">
                  {selection === 'Entrega' &&
                    !addressSelected.id &&
                    !loading && (
                      <div className="mt-5 flex flex-col gap-2 text-sm items-center opacity-70">
                        <span>Selecione um local de entrega 😉</span>
                      </div>
                    )}

                  {loading && (
                    <div className="mt-2 flex flex-col gap-2 text-sm items-center opacity-70">
                      <span>carregando... 😉</span>
                    </div>
                  )}

                  {!loading && addressSelected.id && (
                    <div className=" flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin color="#898989" size={22} />

                        <span className="text-[12px] text-[#898989]">
                          {addressSelected?.street}, {addressSelected?.number}
                        </span>
                      </div>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <span
                    onClick={handleChoiceOfAction}
                    className="text-[#16A6FF] text-base cursor-pointer hover:underline transition-all"
                  >
                    {listAddress?.length === 0 && 'Novo endereço'}
                    {listAddress?.length > 0 &&
                      addressSelected.id &&
                      'Escolher outro endereço'}
                    {listAddress?.length > 0 &&
                      !addressSelected.id &&
                      'Escolher endereço'}
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
                {selection === 'Retirada' && (
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
                            {selectedLocalDetails.street},{' '}
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
