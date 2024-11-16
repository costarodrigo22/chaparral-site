import Button from '@/components/ui/Button/index';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Separator } from '@/components/ui/Separator';
import { MailIcon, PhoneIcon } from 'lucide-react';
import Image from 'next/image';

export interface IData {
  id: string;
  name: string;
  cnpj: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  cep: string;
  state: string;
  phone_number: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  email: string;
}

interface ModalContactsProps {
  open: boolean;
  onClose: () => void;
  data: IData;
}

export default function ModalContacts({
  open,
  onClose,
  data,
}: ModalContactsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-[350px] md:w-[450px] overflow-y-auto overflow-x-auto p-4 px-4 rounded-[10px]">
        <div>
          <h2 className="text-darkGray font-semibold text-base md:text-lg">
            Entre em contato conosco
          </h2>
          <p className="font-medium text-xs md:text-base text-lightGray">
            Tem alguma dúvida?
          </p>
          <p className="font-medium text-xs md:text-base text-lightGray">
            Nossa equipe está aqui para te atender :)
          </p>
        </div>
        <Separator />
        <div className="flex flex-col gap-6 pb-1">
          <article className="flex items-center border border-[#E4E7E9] py-3 pl-6 gap-4 rounded-xl  ">
            <MailIcon size={24} color="#000" />
            <div className="flex flex-col">
              <span className="text-black font-medium text-base">E-mail</span>
              <span className=" text-lightGray font-medium text-sm">
                {data.email}
              </span>
            </div>
          </article>
          <article className="flex items-center border border-[#E4E7E9] py-3 pl-6 gap-4 rounded-xl  ">
            <PhoneIcon size={24} color="#000" />
            <div className="flex flex-col">
              <span className="text-black font-medium text-base">Telefone</span>
              <span className=" text-lightGray font-medium text-sm">
                {data.phone_number}
              </span>
            </div>
          </article>
          <article className="flex flex-col border border-[#E4E7E9] py-3 pl-5 gap-4 rounded-xl">
            <div className="flex items-center gap-4">
              <Image
                alt="Logo do whatsapp"
                src="/whatsapp-icon.svg"
                height={31}
                width={31}
              />
              <div className="flex flex-col">
                <span className="text-black font-medium text-base">
                  Falar no WhatsApp
                </span>
                <span className=" text-lightGray font-medium text-sm">
                  mande uma mensagem no nosso WhatsApp
                </span>
              </div>
            </div>
            <Button
              text="Conversar"
              classNameCustom="bg-[#08964F] text-white h-[45px] w-[170px] ml-11"
              classNameText="text-base font-medium"
              src="/arrow-right.svg"
              onClick={() => window.open(data.whatsapp, '_blank')}
            />
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
}
