'use client';

import { Button } from '@/components/ui/Button';
import ToggleQuantity from '@/components/ui/ToggleQuantity';
import { useCart } from '@/contexts/Cart/CartContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ICartProps {
  code: string;
  nameProduct: string;
  urlImage: string;
}

export default function FooterProducts({
  code,
  nameProduct,
  urlImage,
}: ICartProps) {
  const { quantity, handleTotalCart } = useCart();

  function handleAddToCart() {
    console.log(quantity);

    try {
      const cart = {
        codigoProduto: code,
        nomeProduto: nameProduct,
        urlImage: urlImage,
        param: [
          {
            codigo_cliente: 0,
            itens: [
              {
                codigo_produto: 0,
                quantidade: quantity,
                valor_unitario: 23,
                cfop: '5.101',
                codigo_cenario_impostos_item: 0,
                dados_adicionais_item: 'Forma de pagamento',
                obs_item: 'Texto de valor teste',
              },
            ],
          },
        ],
      };

      localStorage.setItem('cart', JSON.stringify(cart));

      handleTotalCart(quantity);

      toast.success(
        `${quantity} ${quantity > 1 ? 'itens' : 'item'} ${
          quantity > 1 ? 'adicionados' : 'adicionado'
        } ao seu carrinho!`
      );
    } catch (error) {
      toast.error('Algo deu errado ao tentar adicionar item ao carrinho!');
    }
  }

  return (
    <div className="flex flex-col px-5 md:flex-row justify-between gap-5 items-center w-full">
      <ToggleQuantity />

      <Button
        className="rounded-full w-full md:w-[380px] h-[50px] bg-[#2B0036] hover:bg-[#421d4b]"
        onClick={handleAddToCart}
      >
        Adicionar ao carrino
        <ShoppingCart />
      </Button>
    </div>
  );
}
