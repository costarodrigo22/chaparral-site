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

export function unformatCPF(cpf: string): string {
	return cpf.replace(/[.\-]/g, '');
}

export function getColors(text: string): string | undefined {
	const colorMatch = text?.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
	if (colorMatch) {
		return colorMatch[0];
	}
	return undefined;
}

export function formatCpfCnpj(value: string): string {
	value = value.replace(/\D/g, '');

	if (value.length <= 11) {
		return value.replace(
			/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/,
			(match, p1, p2, p3, p4) => {
				return [p1, p2, p3].filter(Boolean).join('.') + (p4 ? '-' + p4 : '');
			}
		);
	} else {
		return value.replace(
			/(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/,
			(match, p1, p2, p3, p4, p5) => {
				return (
					[p1, p2, p3].filter(Boolean).join('.') +
					(p4 ? '/' + p4 : '') +
					(p5 ? '-' + p5 : '')
				);
			}
		);
	}
}

export function formatPhone(value: string): string {
	value = value.replace(/\D/g, '');
	if (value.length <= 10) {
		return value.replace(/(\d{2})(\d{4})(\d{0,4})/, (match, p1, p2, p3) => {
			return `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`;
		});
	} else {
		return value.replace(/(\d{2})(\d{5})(\d{0,4})/, (match, p1, p2, p3) => {
			return `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`;
		});
	}
}

export function getInitials(fullName: string) {
	if (!fullName) return '';

	const names = fullName.trim().split(' ');

	if (names.length === 1) {
		return names[0][0].toUpperCase();
	}

	const firstNameInitial = names[0][0].toUpperCase();
	const lastNameInitial = names[names.length - 1][0].toUpperCase();

	return firstNameInitial + lastNameInitial;
}
export function getJustNumbers(value: string): string {
	return value.replace(/\D/g, '');
}
export function formatCEP(cep: string) {
	// Remove todos os caracteres não numéricos
	const cepNumerico = cep.replace(/\D/g, '');

	if (getJustNumbers(cepNumerico).length >= 6) {
		return cepNumerico.replace(/(\d{5})(\d{0,3})/, '$1-$2');
	} else {
		return cepNumerico;
	}
}
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
