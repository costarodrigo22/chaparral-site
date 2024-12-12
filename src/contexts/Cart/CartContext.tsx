"use client";

import { getCart } from "@/services/cart";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";

interface ICartItems {
  id: string;
  product_code: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
  product_url_image: string;
}

interface CartContextProps {
  quantity: number;
  total: number;
  totalCartNav: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

export const CartContext = createContext({} as CartContextProps);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);

  const handleGetItemsCart = useCallback(async () => {
    try {
      const response = await getCart();

      setCartItems(response.item.item);

      console.log("cart: ", response.item.item);
    } catch (error) {
      toast.error(`Algo deu errado ao buscar o carrinho: ${error}`);
    }
  }, []);

  useEffect(() => {
    handleGetItemsCart();
  }, [handleGetItemsCart]);

  // daqui pra baixo é antigo

  const [quantity, setQuantity] = useState(0);

  const updateTotal = useCallback((newQuantity: number) => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const product = JSON.parse(cartData);

        // Atualiza o localStorage com a nova quantidade e total
        product.param[0].itens[0].quantidade = newQuantity;
        localStorage.setItem("cart", JSON.stringify(product));
      } catch (error) {
        console.error("Erro ao fazer parse dos dados do carrinho:", error);
      }
    }
  }, []);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateTotal(newQuantity);
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity - 1, 1);
      updateTotal(newQuantity);
      return newQuantity;
    });
  };

  return (
    <CartContext.Provider
      value={{
        quantity,
        total: cartItems.length,
        totalCartNav: cartItems.length,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
