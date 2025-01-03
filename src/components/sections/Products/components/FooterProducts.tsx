'use client';

import { Button } from '@/components/ui/Button';
import ToggleQuantity from '@/components/ui/ToggleQuantity';
import { useCart } from '@/contexts/Cart/CartContext';
import { addToCart } from '@/services/cart';
import { useMutation } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ICartProps {
  code: string;
  nameProduct: string;
  urlImage: string;
  isLogged: boolean;
  value: number;
}

export default function FooterProducts({
  isLogged,
  code,
  nameProduct,
  urlImage,
  value,
}: ICartProps) {
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const { updatedCart } = useCart();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addToCart,
  });

  async function handleAddToCart() {
    if (isLogged) {
      try {
        await mutateAsync({
          product_name: nameProduct,
          product_code: code,
          product_quantity: quantity,
          product_url_image: urlImage,
          product_price: value,
        });

        toast.success('Item adicionado ao carrinho!');
      } catch (error) {
        toast.error(
          `Algo deu errado ao adicionar o item ao carrinho: ${error}`
        );
      } finally {
        await updatedCart();
      }
    }

    if (!isLogged) router.push('/sign-in');
  }

  return (
    <div className="flex flex-col px-5 md:flex-row justify-between gap-5 items-center w-full">
      <ToggleQuantity
        initialQuantity={1}
        onIncrement={(q) => setQuantity(q)}
        onDecrement={(q) => setQuantity(q)}
      />

      <Button
        className="rounded-full w-full md:w-[380px] h-[50px] bg-[#2B0036] hover:bg-[#421d4b]"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending && 'Adicionando...'}

        {!isPending && 'Adicionar ao carrino'}
        <ShoppingCart />
      </Button>
    </div>
  );
}
