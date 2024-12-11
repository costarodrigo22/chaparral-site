"use client";

import ProductsListCart from "./ProductsListCart";
import OrderSummary from "./OrderSummary";
import { useCart } from "@/contexts/Cart/CartContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CartCheck() {
  const [token, setTOken] = useState<string | null | undefined>("");

  const { total } = useCart();

  const session = useSession();

  useEffect(() => {
    console.log("Token disponível:", token);

    setTOken(session.data?.user?.name);
  }, [token, session]);

  if (session.status === "loading") return "Carregando...";

  return (
    <div>
      {total === 0 ? (
        <div className="text-lg flex items-center justify-center text-center font-semibold w-full h-[300px]">
          <span>token: {token}</span>

          <h2>O seu carrinho está vazio 😢</h2>
        </div>
      ) : (
        <div className="flex gap-9 flex-col lg:flex-row ">
          <ProductsListCart />
          <OrderSummary />
        </div>
      )}
    </div>
  );
}
