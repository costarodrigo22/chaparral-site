import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Entrega',
	description: 'ÍAÇA puro',
	keywords: ['íaça', 'açaí', 'puro', 'delivery', 'sobremesa'],
};

export default function DeliveryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
