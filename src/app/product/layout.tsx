import CartProvider from '@/contexts/Cart/CartContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Produto ÍAÇA puro',
	description: 'ÍAÇA puro',
	keywords: ['íaça', 'açaí', 'puro', 'delivery', 'sobremesa'],
};

export default function ProductLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CartProvider>
			<div>{children}</div>
		</CartProvider>
	);
}
