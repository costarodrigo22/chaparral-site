import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Carrinho ÍAÇA puro',
	description: 'ÍAÇA puro',
	keywords: ['íaça', 'açaí', 'puro', 'delivery', 'sobremesa'],
};

export default function CartLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
