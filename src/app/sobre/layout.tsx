import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sobre ÍAÇA puro',
	description: 'ÍAÇA puro',
	keywords: ['íaça', 'açaí', 'puro', 'delivery', 'sobremesa'],
};

export default function SobreLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
