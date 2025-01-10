import { localStorageKeys } from "@/config/localStorageKeys";
import { useCart } from "@/contexts/Cart/CartContext";
import { usePaymentSelection } from "@/hooks/useSelectionPayment";
import api from "@/lib/axiosInstance";
import { httpClient } from "@/lib/httpClient";
import { getAddressSelected } from "@/services/address";
import { clearCart } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";
import { toast } from "sonner";

interface ICartItem {
  id: string;
  product_name: string;
  product_quantity: number;
  product_price: number;
  product_code: number;
  product_url_image: string;
}

export default function useModalConfirmOrder(router:AppRouterInstance, onClose: () => void) {

  const [loadingOrder, setLoadingOrder] = useState(false);
  // const [openModalPix, setOpenModalPix] = useState(false);
  // const [orderNumber, setOrderNumber] = useState('');
  // const [codeOrderOmie, setCodeOrderOmie] = useState(0);


  const { selection } = usePaymentSelection();

  const { resetCart } = useCart();

  const { data: dataAddressSelected } = useQuery({
    queryKey: ['getAddressSelectedPaymentModal'],
    queryFn: getAddressSelected,
  });

  const pickUpLocation = localStorage.getItem('local_delivery')
    ? JSON?.parse(localStorage.getItem('local_delivery') || '')
    : '';

  async function handleConfirmOrder() {
    setLoadingOrder(true);

    const userLogged = await httpClient.get('/user/profile');

    const deliveryOrPickUp = localStorage.getItem('local_delivery')
      ? 'RETIRADA'
      : 'ENTREGA';

    let address = '';
    let addressOrder;

    if (deliveryOrPickUp === 'RETIRADA') {
      const pickUpAddress = localStorage.getItem('local_delivery');

      address = JSON.parse(pickUpAddress || '').name;

      const addressOrderParsed = JSON.parse(pickUpAddress || '');

      addressOrder = {
        id: addressOrderParsed.id,
        cep: addressOrderParsed.cep,
        country: 'Brasil',
        street: addressOrderParsed.street,
        number: addressOrderParsed.number,
        neighborhood: addressOrderParsed.neighborhood,
        complement: addressOrderParsed.operational_time,
        city: addressOrderParsed.city,
        state: addressOrderParsed.uf,
        uf: addressOrderParsed.uf,
        reference: '',
        selected: false,
      };
    }

    if (deliveryOrPickUp === 'ENTREGA') {
      const addressSelected = await httpClient.get('/user/address/select');

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

    const cartItems = await httpClient.get('/user/cart');

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

    const freight = JSON.parse(localStorage.getItem('freight') || '');

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
              selection === 'PixSite'
                ? '17'
                : selection === 'CreditCardDelivery'
                ? '03' 
                : selection === 'DebitCardDelivery' 
                ? '04'
                : '15', // cartão de crédito é 03, cartão de débito é 04, boleto 15 e pix 17
          },
        },
      ],
    };

    try {
      const responseOmieCreateOrder = await api.post(
        '/api/without/omie/insert_sale',
        bodyOmie
      );

      const jwtToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
      const decodedJwt = jwtDecode(jwtToken || '');
      let pixIdlet = '';
      
      const firstName = userLogged.data.item.item.name.split(' ')[0];

      const bodyPix = {
        param: [
          {
            cUrlNotif: `${process.env.NEXT_PUBLIC_C_URL_NOTIF_URL}/${responseOmieCreateOrder.data.numero_pedido}/${decodedJwt.sub}/${userLogged.data.item.item.email}/${firstName}/${responseOmieCreateOrder.data.codigo_pedido}`,
            nIdCliente: userLogged.data.item.item.code_omie,
            vValor:
              deliveryOrPickUp === 'ENTREGA'
                ? totalCart + Number(freight)
                : totalCart,
          },
        ],
      };
      if (selection === 'PixSite') {
        const pixInfos = await api.post(
          '/api/without/omie/create_pix',
          bodyPix
        );
        pixIdlet = pixInfos.data.nIdPix;
      }
      const bodyOrder = {
        address: addressOrder,
        products: cartItems.data.item.item,
        total: totalCart + Number(freight),
        freight: Number(freight),
        payment_form: selection,
        delivery_form: deliveryOrPickUp,
        order_number_omie: responseOmieCreateOrder.data.numero_pedido,
        order_code_omie: responseOmieCreateOrder.data.codigo_pedido,
        id_pix_omie: pixIdlet,
      };
      await httpClient.post('/user/order', bodyOrder);

      toast.success('Pedido gerado com sucesso.');

      await clearCart();

      resetCart();

      await httpClient.post('/send', {
        email: userLogged.data.item.item.email,
        name: userLogged.data.item.item.name,
      });

      if (selection === 'PixSite') {
        // setOrderNumber(responseOmieCreateOrder.data.numero_pedido);
        // setCodeOrderOmie(responseOmieCreateOrder.data.codigo_pedido);

        router.push(
          `/PixPage/${pixIdlet}?order_number=${responseOmieCreateOrder.data.numero_pedido}&code_order=${responseOmieCreateOrder.data.codigo_pedido}`
        );

        return;
      }

      router.push(
        `/TrackOrder/${responseOmieCreateOrder.data.numero_pedido}/${responseOmieCreateOrder.data.codigo_pedido}`
      );
    } catch (error) {
      toast.error(`Algo deu errado ao gerar seu pedido: ${error}`);
    } finally {
      onClose();
      setLoadingOrder(false);
    }
  }
  
  return { loadingOrder, handleConfirmOrder, dataAddressSelected, pickUpLocation, selection };
}
