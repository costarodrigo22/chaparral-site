"use client";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogHeader,
  // DialogTitle,
} from "@/components/ui/Dialog";
import { House, ThumbsUp } from "lucide-react";
import logoPix from "../../../../public/pix.svg";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { usePaymentSelection } from "@/hooks/useSelectionPayment";
import logoCard from "../../../../public/card.svg";
import api from "@/lib/axiosInstance";
import { useState } from "react";
import { toast } from "sonner";
import ModalPix from "./ModalPix";
// import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { getAddressSelected } from "@/services/address";
import { httpClient } from "@/lib/httpClient";

interface ICartItem {
  id: string;
  product_name: string;
  product_quantity: number;
  product_price: number;
  product_code: number;
  product_url_image: string;
}

interface IModalConfirmOrder {
  open: boolean;
  onClose: () => void;
}

interface IPixProps {
  copyPaste: string;
  qrCode: string;
}

export default function ModalConfirmOrder({
  open,
  onClose,
}: IModalConfirmOrder) {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [openModalPix, setOpenModalPix] = useState(false);
  const [infosPix, setInfosPix] = useState<IPixProps>();

  // const router = useRouter();

  const { selection } = usePaymentSelection();

  const { data: dataAddressSelected } = useQuery({
    queryKey: ["getAddressSelectedPaymentModal"],
    queryFn: getAddressSelected,
  });

  const pickUpLocation = localStorage.getItem("local_delivery")
    ? JSON?.parse(localStorage.getItem("local_delivery") || "")
    : "";

  // const codeClient = JSON.parse(localStorage.getItem('code_client') || '');

  // const cartLocal = JSON.parse(localStorage.getItem('cart') || '');

  // const emailLocal = localStorage.getItem('email_client');

  async function handleConfirmOrder() {
    setLoadingOrder(true);

    const userLogged = await httpClient.get("/user/profile");

    const deliveryOrPickUp = localStorage.getItem("local_delivery")
      ? "RETIRADA"
      : "ENTREGA";

    let address = "";
    let addressOrder;

    if (deliveryOrPickUp === "RETIRADA") {
      const pickUpAddress = localStorage.getItem("local_delivery");

      address = JSON.parse(pickUpAddress || "").name;

      const addressOrderParsed = JSON.parse(pickUpAddress || "");

      addressOrder = {
        id: addressOrderParsed.id,
        cep: addressOrderParsed.cep,
        country: "Brasil",
        street: addressOrderParsed.street,
        number: addressOrderParsed.number,
        neighborhood: addressOrderParsed.neighborhood,
        complement: addressOrderParsed.operational_time,
        city: addressOrderParsed.city,
        state: addressOrderParsed.uf,
        uf: addressOrderParsed.uf,
        reference: "",
        selected: false,
      };
    }

    if (deliveryOrPickUp === "ENTREGA") {
      const addressSelected = await httpClient.get("/user/address/select");

      address = `Rua: ${addressSelected.data.item.street}, Bairro: ${addressSelected.data.item.neighborhood}, Número: ${addressSelected.data.item.number}, Complemento: ${addressSelected.data.item.complement}`;

      addressOrder = {
        id: addressSelected.data.item.id,
        cep: addressSelected.data.item.cep,
        country: addressSelected.data.item.country,
        street: addressSelected.data.item.street,
        number: addressSelected.data.item.number,
        neighborhood: addressSelected.data.item.neighborhood,
        complement: addressSelected.data.item.complement,
        city: addressSelected.data.item.city,
        state: addressSelected.data.item.state,
        uf: addressSelected.data.item.uf,
        reference: addressSelected.data.item.reference,
        selected: addressSelected.data.item.selected,
      };
    }

    const cartItems = await httpClient.get("/user/cart");

    const cartMapped = cartItems.data.item.item.map((item: ICartItem) => ({
      codigo_produto: item.product_code,
      descricao: item.product_name,
      quantidade: item.product_quantity,
      valor_unitario: item.product_price,
    }));

    const totalCart = cartItems.data.item.item.reduce(
      (sum: number, product: ICartItem) =>
        sum + product.product_price * product.product_quantity,
      0
    );

    const freight = JSON.parse(localStorage.getItem("freight") || "");

    const bodyOmie = {
      param: [
        {
          codigo_cliente: userLogged.data.item.item.code_omie,
          observacoes_entrega: `${deliveryOrPickUp} - ${address}`, //concatenar {ENTREGA - endereço selecionado} se não {RETIRADA - local da retirada}
          valor_frete: Number(freight),
          produto: cartMapped,
          informacoes_adicionais: {
            utilizar_emails: userLogged.data.item.item.email,
            meio_pagamento:
              selection === "PixSite" || selection === "PixDelivery"
                ? "17"
                : selection === "CardDelivery"
                ? "03"
                : "15", // cartão de crédito é 3, boleto 15 e pix 17
          },
        },
      ],
    };

    const bodyPix = {
      param: [
        {
          nIdCliente: userLogged.data.item.item.code_omie,
          vValor:
            deliveryOrPickUp === "ENTREGA"
              ? totalCart + Number(freight)
              : totalCart,
        },
      ],
    };

    try {
      const responseOmieCreateOrder = await api.post(
        "/api/without/omie/insert_sale",
        bodyOmie
      );

      console.log("createOrderOmie: ", responseOmieCreateOrder);
      // pegar do retorno da Omie o número do pedido e adicionar no DynamoDB com a chave order_number_omie
      const bodyOrder = {
        address: addressOrder,
        products: cartItems.data.item.item,
        total: totalCart + Number(freight),
        payment_form: selection,
        delivery_form: deliveryOrPickUp,
        order_number_omie: "",
      };

      await httpClient.post("/user/order", bodyOrder);

      if (selection === "PixSite" || selection === "PixDelivery") {
        const pixInfos = await api.post(
          "/api/without/omie/create_pix",
          bodyPix
        );

        setInfosPix({
          copyPaste: pixInfos.data.cCopiaCola,
          qrCode: pixInfos.data.cQrCode,
        });
      }

      toast.success("Pedido gerado com sucesso.");

      if (selection === "PixSite") {
        setOpenModalPix(true);
      }
    } catch (error) {
      toast.error(`Algo deu errado ao gerar seu pedido: ${error}`);
    } finally {
      setLoadingOrder(false);
    }

    // setLoadingOrder(true);

    // localStorage.removeItem('order_number');

    // const total =
    //   cartLocal.param[0].itens[0].quantidade *
    //   cartLocal.param[0].itens[0].valor_unitario;

    // const body = {
    //   param: [
    //     {
    //       codigo_cliente: codeClient,
    //       observacoes_entrega: pickUpLocation.name,
    //       produto: {
    //         codigo_produto: cartLocal.codigoProduto,
    //         descricao: cartLocal.nomeProduto,
    //         quantidade: cartLocal.param[0].itens[0].quantidade,
    //         valor_unitario: cartLocal.param[0].itens[0].valor_unitario,
    //       },
    //       informacoes_adicionais: {
    //         utilizar_emails: emailLocal,
    //         meio_pagamento:
    //           selection === 'PixSite' || selection === 'PixDelivery'
    //             ? '17'
    //             : selection === 'CardDelivery'
    //             ? '03'
    //             : '15', // cartão de crédito é 3, boleto 15 e pix 17
    //       },
    //     },
    //   ],
    // };

    // const bodyPix = {
    //   param: [
    //     {
    //       nIdCliente: codeClient,
    //       vValor: total,
    //     },
    //   ],
    // };

    // try {
    //   const response = await api.post('/api/without/omie/insert_sale', body);

    //   localStorage.setItem('order_number', response.data.codigo_pedido);

    //   if (selection === 'PixSite' || selection === 'PixDelivery') {
    //     const pixInfos = await api.post(
    //       '/api/without/omie/create_pix',
    //       bodyPix
    //     );

    //     setInfosPix({
    //       copyPaste: pixInfos.data.cCopiaCola,
    //       qrCode: pixInfos.data.cQrCode,
    //     });
    //   }

    //   if (response.status === 200)
    //     toast.success(`${response.data.descricao_status}`);

    //   if (response.status !== 200)
    //     toast.error(`${response.data.descricao_status}`);
    // } catch (error) {
    //   toast.error('Algo deu errado!');
    // } finally {
    //   setLoadingOrder(false);

    //   if (selection === 'CardDelivery' || selection === 'PixDelivery') {
    //     router.push('/TrackOrder');

    //     // localStorage.removeItem("cart");
    //   }

    //   if (selection === 'PixSite') {
    //     setOpenModalPix(true);
    //   }
    // }
  }

  return (
    <>
      <ModalPix
        open={openModalPix}
        pix_copy_paste={infosPix?.copyPaste || ""}
        qd_code={infosPix?.qrCode || ""}
        onClose={() => setOpenModalPix(false)}
      />

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
                    {dataAddressSelected?.neighborhood},{" "}
                    {dataAddressSelected?.number} -{" "}
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
                    {pickUpLocation?.street}, {pickUpLocation?.neighborhood} -{" "}
                    {pickUpLocation?.number}
                  </span>
                </div>
              )}
            </div>
            <span className="text-[#898989] text-xs">Forma de pagamento:</span>
            <div className="flex border p-5 items-center rounded-lg gap-4">
              <Image
                src={
                  selection === "PixSite" || selection === "PixDelivery"
                    ? logoPix
                    : logoCard
                }
                alt="logo"
              />

              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">
                  {selection === "PixSite" || selection === "PixDelivery"
                    ? "Pix"
                    : "Cartão"}
                </span>
                <span className="text-[#898989] text-sm">
                  {selection === "PixSite" || selection === "PixDelivery"
                    ? "Utilize o QR code ou copie e cole o código"
                    : "Utilize seu cartão para pagamento"}
                </span>
              </div>
            </div>

            <Button
              disabled={loadingOrder}
              onClick={handleConfirmOrder}
              className="bg-[#2B0036] w-full h-14 rounded-full mt-5 hover:bg-[#5a3663]"
            >
              {loadingOrder && "Gerando pedido..."}
              {!loadingOrder && "Confirmar e gerar pedido"}

              <ThumbsUp />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
