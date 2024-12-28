'use client';

import { Button } from '@/components/ui/Button';
import { getAddress } from '@/services/address';
import { useQuery } from '@tanstack/react-query';
import { Edit, Home, Map, Plus } from 'lucide-react';
import NewAddress from '../Delivery/NewAddress';
import { useState } from 'react';
import UpdateAddress from '../Delivery/UpdateAddress';
import { formatCEP } from '@/lib/utils';

interface ICardProps {
  id: string;
  cep: string;
  country: string;
  street: string;
  number: number;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  uf: string;
  reference: string;
  selected: boolean;
  is_default: boolean;
}

export default function CardAddress() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [ModalEditAddressData, setModalEditAddressData] = useState(
    {} as ICardProps
  );

  const { data, isLoading } = useQuery({
    queryKey: ['listAddress'],
    queryFn: getAddress,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <span>carregando...</span>
      </div>
    );
  }

  return (
    <>
      <NewAddress open={openModal} onClose={() => setOpenModal(false)} />

      <UpdateAddress
        open={openModalEdit}
        address={ModalEditAddressData}
        onClose={() => setOpenModalEdit(false)}
      />

      <div className="flex justify-end items-center  px-0 md:px-10 xl:px-32">
        <Button
          className="bg-[#E2E8F0] hover:bg-slate-400 transition-all mb-4"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="" color="black" />

          <span className="text-black">Novo endereço</span>
        </Button>
      </div>
      <div className="flex flex-col px-0 md:px-10 xl:px-32 gap-9">
        {data.length === 0 && (
          <div className="flex items-center justify-center w-full">
            <span>Você não tem endereços cadastrados. 😢</span>
          </div>
        )}

        {data.map((address: ICardProps) => (
          <div
            key={address.id}
            className="flex items-center w-full p-6 shadow-sm rounded-md"
          >
            {address.is_default && (
              <Home className="mr-1 sm:mr-6" color="#2B0036" />
            )}

            {!address.is_default && (
              <Map className="mr-1 sm:mr-6" color="#2B0036" />
            )}

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <span className="text-[#1E1E1E] text-[16px] font-semibold">
                    {address.street}, {address.number}
                  </span>

                  {address.is_default && (
                    <div className="bg-[#e991ff1a] rounded-full w-[150px] p-[3px] flex items-center justify-center">
                      <p className="text-[#5E14FF] text-[13px] font-medium">
                        Endereço padrão
                      </p>
                    </div>
                  )}
                </div>
                <span className="text-[#1E1E1E] text-[16px] font-normal">
                  {formatCEP(address.cep)}, {address.neighborhood},{' '}
                  {address.city} - {address.uf}, {address.complement}
                </span>
              </div>

              <Edit
                className="cursor-pointer"
                onClick={() => (
                  setOpenModalEdit(true), setModalEditAddressData(address)
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
