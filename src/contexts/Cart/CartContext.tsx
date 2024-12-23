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

// interface ISessionValue {
// 	user: {
// 		email: string;
// 		id: string;
// 		name: string;
// 		token: string;
// 	};
// }

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
	resetCart: () => void;
}

interface IAuthProviderCart {
	children: React.ReactNode;
	isAuthenticated: boolean;
	token?: string;
}

export const CartContext = createContext({} as CartContextProps);

export default function CartProvider({
	children,
	isAuthenticated,
	token,
}: IAuthProviderCart) {
	const [cartItems, setCartItems] = useState<ICartItems[]>([]);
	const [quantityItemCart, setQuantityItemCart] = useState(0);
	const [loadingCart, setLoadingCart] = useState(true);

	const totalCart = useMemo(() => {
		return cartItems.reduce(
			(sum, product) => sum + product.product_price * product.product_quantity,
			0
		);
	}, [cartItems]);

	function handleResetCart() {
		setCartItems([]);

		setQuantityItemCart(0);
	}

	const handleGetItemsCart = useCallback(async () => {
		try {
			if (!isAuthenticated || !token) {
				return;
			}

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
	}, [isAuthenticated, token]);

	useEffect(() => {
		if (isAuthenticated) {
			handleGetItemsCart();
		}
	}, [isAuthenticated, handleGetItemsCart]);

	return (
		<CartContext.Provider
			value={{
				quantityItemCart,
				items: cartItems,
				totalCart,
				loadingCart,
				updatedCart: handleGetItemsCart,
				resetCart: handleResetCart,
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
