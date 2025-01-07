'use client';
import { DialogContent, Dialog } from '@/components/ui/Dialog';
import { Order } from './OrderCardTypes';
import { Separator } from '@/components/ui/Separator';
import { cn, formatCurrency, formatDateTime } from '@/lib/utils';
import Image from 'next/image';

interface IModalOrderDetails {
  open: boolean;
  onClose: () => void;
  order: Order;
  handleGetBgAndColor: (status: string) => string;
}

export default function ModalOrderDetails({
  open,
  onClose,
  handleGetBgAndColor,
  order,
}: IModalOrderDetails) {
  function capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[600px] w-full overflow-y-auto overflow-x-auto p-3">
        <div className="pt-5 px-6 pb-7 m-7 border border-[#E4E7E9] rounded-[20px] h-auto">
          <div className="flex flex-col gap-5 items-start">
            <div className=" flex items-center gap-2">
              <h2 className="font-semibold text-2xl text-darkGray">
                Detalhes do Pedido
              </h2>
              <span
                className={cn(
                  ' text-sm font-medium px-2 py-1 rounded-[57px] ',
                  handleGetBgAndColor(order.orderStatus)
                )}
              >
                {order.orderStatus}
              </span>
            </div>
            <span className="font-bold text-base text-[#898989]">
              N° pedido:{' '}
              <span className="font-medium">{order.order_number_omie}</span>
            </span>
            <span className="font-bold text-base text-[#898989]">
              Data:{' '}
              <span className="font-medium">
                {formatDateTime(order.createdAt)}
              </span>
            </span>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col items-start gap-8 mb-6">
            {order?.products?.map((product, key) => (
              <div key={key} className="flex items-center gap-4">
                <Image
                  src={product?.product_url_image || ''}
                  alt={`Imagem do produto ${product?.product_name}`}
                  width={72}
                  height={96}
                />
                <div className="flex flex-col gap-3 items-start">
                  <span className="text-[#2B0036] text-lg font-semibold">
                    {product?.product_name}
                  </span>
                  <span className="text-[#2B0036] text-base font-semibold">{`${
                    product.product_quantity
                  } x ${formatCurrency(product.product_price)}`}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className=" text-lg font-medium text-[#00000099]">
              Subtotal
            </span>
            <span className="text-darkGray font-medium text-lg">
              {formatCurrency(order.total - (order.freight || 0))}
            </span>
          </div>
          {order.delivery_form === 'ENTREGA' && (
            <div className="flex justify-between items-center">
              <span className=" text-lg font-medium text-[#00000099]">
                Taxa de entrega
              </span>
              <span className="text-darkGray font-medium text-lg">
                {order.freight ? formatCurrency(order.freight) : 'Grátis'}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className=" text-lg font-medium text-[#00000099]">
              Forma de pagamento
            </span>
            <span className="text-darkGray font-medium text-lg">
              {order.payment_form === 'CardDelivery'
                ? 'Cartão'
                : order.payment_form === 'PixSite' ||
                  order.payment_form === 'PixDelivery'
                ? 'Pix'
                : 'Boleto'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className=" text-lg font-medium text-[#00000099]">
              Endereço de {capitalizeFirstLetter(order.delivery_form)}
            </span>
          </div>
          <Separator className="my-5" />
          <div className="flex justify-between items-center">
            <span className="text-darkGray font-medium text-xl">Total</span>
            <span className="text-darkGray font-medium text-2xl">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
