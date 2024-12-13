'use client';

import { getCart } from '@/services/cart';
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
} from 'react';
import { toast } from 'sonner';

interface ICartItems {
	id: string;
	product_code: string;
	product_name: string;
	product_price: number;
	product_quantity: number;
	product_url_image: string;
}

interface CartContextProps {
	quantityItemCart: number;
	items: ICartItems[];
	totalCart: number;
	loadingCart: boolean;
	updatedCart: () => Promise<void>;
}

export const CartContext = createContext({} as CartContextProps);

export default function CartProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cartItems, setCartItems] = useState<ICartItems[]>([]);
	const [quantityItemCart, setQuantityItemCart] = useState(0);
	const [loadingCart, setLoadingCart] = useState(true);

	const totalCart = useMemo(() => {
		return cartItems.reduce(
			(sum, product) => sum + product.product_price * product.product_quantity,
			0
		);
	}, [cartItems]);

	const handleGetItemsCart = useCallback(async () => {
		try {
			const response = await getCart();

			setCartItems(response.item.item);

			const totalItemsCart = response.item.item.reduce(
				(sum: number, product: ICartItems) => sum + product.product_quantity,
				0
			);

			setQuantityItemCart(totalItemsCart);
		} catch (error) {
			toast.error(`Algo deu errado ao buscar o carrinho: ${error}`);
		} finally {
			setLoadingCart(false);
		}
	}, []);

	useEffect(() => {
		handleGetItemsCart();
	}, [handleGetItemsCart]);

	return (
		<CartContext.Provider
			value={{
				quantityItemCart,
				items: cartItems,
				totalCart,
				loadingCart,
				updatedCart: handleGetItemsCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
