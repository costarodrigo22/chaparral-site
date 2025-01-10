'use client';

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogHeader,
  // DialogTitle,
} from '@/components/ui/Dialog';
import { House, ThumbsUp } from 'lucide-react';
import logoPix from '../../../../../public/pix.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import logoCard from '../../../../../public/card.svg';
import useModalConfirmOrder from './useModalConfirmOrder';
import { useRouter } from 'next/navigation';
// import ModalPix from './ModalPix';

interface IModalConfirmOrder {
  open: boolean;
  onClose: () => void;
}

// interface IPixProps {
//   copyPaste: string;
//   qrCode: string;
// }

export default function ModalConfirmOrder({
  open,
  onClose,
}: IModalConfirmOrder) {
  const router = useRouter();
  const {
    dataAddressSelected,
    handleConfirmOrder,
    loadingOrder,
    pickUpLocation,
    selection,
  } = useModalConfirmOrder(router, onClose);

  return (
    <>
      {/* <ModalPix
        open={openModalPix}
        pix_copy_paste={infosPix?.copyPaste || ''}
        qd_code={infosPix?.qrCode || ''}
        order_number={orderNumber}
        codigo_pedido={codeOrderOmie}
        onClose={() => setOpenModalPix(false)}
      /> */}

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-[550px] w-full overflow-y-auto overflow-x-auto p-3">
          <span>Confirme a retirada do produto</span>

          <div>
            <span className="text-[#898989] text-xs">Retirar em:</span>
            <div className="flex border p-5 items-center rounded-lg gap-4 mb-4">
              <House />

              {dataAddressSelected?.id && !pickUpLocation?.id && (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-sm">
                    {dataAddressSelected?.street}
                  </span>
                  <span className="text-[#898989] text-sm">
                    {dataAddressSelected?.neighborhood},{' '}
                    {dataAddressSelected?.number} -{' '}
                    {dataAddressSelected?.complement}
                  </span>
                </div>
              )}

              {pickUpLocation?.id && (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-sm">
                    {pickUpLocation?.name}
                  </span>
                  <span className="text-[#898989] text-sm">
                    {pickUpLocation?.street}, {pickUpLocation?.neighborhood} -{' '}
                    {pickUpLocation?.number}
                  </span>
                </div>
              )}
            </div>
            <span className="text-[#898989] text-xs">Forma de pagamento:</span>
            <div className="flex border p-5 items-center rounded-lg gap-4">
              <Image
                src={
                  selection === 'PixSite' || selection === 'PixDelivery'
                    ? logoPix
                    : logoCard
                }
                alt="logo"
              />

              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">
                  {selection === 'PixSite' || selection === 'PixDelivery'
                    ? 'Pix'
                    : selection === 'CreditCardDelivery'
                    ? 'Cartão de Credito'
                    : 'Cartão de Débito'}
                </span>
                <span className="text-[#898989] text-sm">
                  {selection === 'PixSite'
                    ? 'Utilize o QR code ou copie e cole o código'
                    : 'Utilize seu cartão para pagamento'}
                </span>
              </div>
            </div>

            <Button
              disabled={loadingOrder}
              onClick={handleConfirmOrder}
              className="bg-[#2B0036] w-full h-14 rounded-full mt-5 hover:bg-[#5a3663]"
            >
              {loadingOrder && 'Gerando pedido...'}
              {!loadingOrder && 'Confirmar e gerar pedido'}

              <ThumbsUp />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
