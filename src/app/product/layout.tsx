import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Produto ÍAÇA puro',
	description: '',
};

export default function ProductLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
