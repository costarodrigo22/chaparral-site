import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Entrega',
	description: '',
};

export default function DeliveryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
