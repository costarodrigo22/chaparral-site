"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/axiosInstance";

interface IDetailsOrderProps {
  pickUpLocal: string;
  paymentMethod: string;
  total: number;
}

export default function PickUpLocal() {
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
      <span className="text-base">Retirar em:</span>

      <div className="flex items-center justify-between">
        <div className="mt-2 flex flex-col gap-1">
          <span className="text-[#898989] text-base">{infos.pickUpLocal}</span>
        </div>
      </div>
    </div>
  );
}
