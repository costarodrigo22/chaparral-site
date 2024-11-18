"use client";

import Image from "next/image";
import logoCard from "../../../../public/card.svg";
import logoPix from "../../../../public/pix.svg";
import logoBoleto from "../../../../public/boleto.svg";
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { Separator } from "@/components/ui/Separator";
import { formatCurrency } from "@/lib/utils";

interface IDetailsOrderProps {
  pickUpLocal: string;
  paymentMethod: string;
  total: number;
}

export default function DetailsOrder() {
  const [infos, setInfos] = useState<IDetailsOrderProps>(
    {} as IDetailsOrderProps
  );

  const order = Number(localStorage.getItem("order_number"));

  const handleGetDataOrder = useCallback(async () => {
    const response = await api.get(`/api/without/omie/consult_sale/${order}`);

    const methodPayment =
      response.data.pedido_venda_produto.lista_parcelas.parcela[0]
        .meio_pagamento === "17"
        ? "Pix"
        : response.data.pedido_venda_produto.lista_parcelas.parcela[0]
            .meio_pagamento === "03"
        ? "Card"
        : "Boleto";

    setInfos({
      pickUpLocal: response.data.pedido_venda_produto.observacoes.obs_venda,
      paymentMethod: methodPayment,
      total: response.data.pedido_venda_produto.total_pedido.base_calculo_icms,
    });
  }, [order]);

  useEffect(() => {
    handleGetDataOrder();
  }, [handleGetDataOrder]);

  return (
    <div className="w-full px-6 py-6 shadow-md rounded-md">
      <span className="text-base">Detalhes do pedido</span>

      <div className="flex items-center justify-between mb-3">
        <div className="mt-2 flex gap-1 w-[400px] justify-between">
          <span className="text-base">Valor Total</span>
          <span className="text-[#1E1E1E] font-semibold text-base">
            {formatCurrency(infos.total)}
          </span>
        </div>
      </div>

      <Separator />

      <div className="mt-2 flex gap-1 w-[400px] justify-between">
        <span className="text-base opacity-60">Forma Pagamento</span>

        <div className="flex gap-1 item">
          {infos.paymentMethod === "Card" && (
            <Image src={logoCard} alt="logo do cartão" width={21} height={14} />
          )}

          {infos.paymentMethod === "Pix" && (
            <Image src={logoPix} alt="logo do pix" width={21} height={14} />
          )}

          {infos.paymentMethod === "Boleto" && (
            <Image
              src={logoBoleto}
              alt="logo do boleto"
              width={21}
              height={14}
            />
          )}

          <span className="text-[#1E1E1E] font-semibold text-sm">
            {infos.paymentMethod === "Card"
              ? "Cartão"
              : infos.paymentMethod === "Pix"
              ? "Pix"
              : "Boleto"}
          </span>
        </div>
      </div>
    </div>
  );
}
