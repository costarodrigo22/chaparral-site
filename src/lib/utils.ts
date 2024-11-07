import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleScroll = (id: string) => {
	const section = document.getElementById(id);
	if (section) {
		const offset = 90;
		const sectionPosition =
			section.getBoundingClientRect().top + window.scrollY;
		const offsetPosition = sectionPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	}
};

export function formatCurrency(value: number) {
	return new Intl.NumberFormat('pt-br', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
}

export function formatCPF(cpf: string | number) {
	cpf = cpf.toString().replace(/\D/g, '');

	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
