import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Carrinho ÍAÇA puro',
	description: '',
};

export default function CartLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
