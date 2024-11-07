'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';

interface CartContextProps {
	quantity: number;
	total: number;
	incrementQuantity: () => void;
	decrementQuantity: () => void;
	clearCart: () => void;
}

export const CartContext = createContext({} as CartContextProps);

export default function CartProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [quantity, setQuantity] = useState(1);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		// Carrega o valor inicial do carrinho do localStorage (caso exista)
		const cartData = localStorage.getItem('cart');
		if (cartData) {
			try {
				const product = JSON.parse(cartData);
				const initialQuantity = product.param[0].itens[0].quantidade;
				const itemValue = product.param[0].itens[0].valor_unitario;
				setQuantity(initialQuantity);
				setTotal(initialQuantity * itemValue);
			} catch (error) {
				console.error('Erro ao fazer parse dos dados do carrinho:', error);
			}
		}
	}, []);

	const updateTotal = useCallback((newQuantity: number) => {
		const cartData = localStorage.getItem('cart');
		if (cartData) {
			try {
				const product = JSON.parse(cartData);
				const itemValue = product.param[0].itens[0].valor_unitario;
				setTotal(newQuantity * itemValue);

				// Atualiza o localStorage com a nova quantidade e total
				product.param[0].itens[0].quantidade = newQuantity;
				localStorage.setItem('cart', JSON.stringify(product));
			} catch (error) {
				console.error('Erro ao fazer parse dos dados do carrinho:', error);
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

	const clearCart = () => {
		setQuantity(0);
		setTotal(0);
		localStorage.removeItem('cart');
	};

	return (
		<CartContext.Provider
			value={{
				quantity,
				total,
				incrementQuantity,
				decrementQuantity,
				clearCart,
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
