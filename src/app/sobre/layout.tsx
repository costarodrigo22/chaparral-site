import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sobre ÍAÇA puro',
	description: '',
};

export default function SobreLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
