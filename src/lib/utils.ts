import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
      behavior: "smooth",
    });
  }
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatCPF(cpf: string | number) {
  cpf = cpf.toString().replace(/\D/g, "");

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
export function getColors(text: string): string | undefined {
  const colorMatch = text.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (colorMatch) {
    return colorMatch[0];
  }
  return undefined;
}

export function formatCpfCnpj(value: string): string {
  value = value.replace(/\D/g, "");

  if (value.length <= 11) {
    return value.replace(
      /(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/,
      (match, p1, p2, p3, p4) => {
        return [p1, p2, p3].filter(Boolean).join(".") + (p4 ? "-" + p4 : "");
      }
    );
  } else {
    return value.replace(
      /(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/,
      (match, p1, p2, p3, p4, p5) => {
        return (
          [p1, p2, p3].filter(Boolean).join(".") +
          (p4 ? "/" + p4 : "") +
          (p5 ? "-" + p5 : "")
        );
      }
    );
  }
}

export function formatPhone(value: string): string {
  value = value.replace(/\D/g, "");
  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, (match, p1, p2, p3) => {
      return `(${p1}) ${p2}${p3 ? "-" + p3 : ""}`;
    });
  } else {
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, (match, p1, p2, p3) => {
      return `(${p1}) ${p2}${p3 ? "-" + p3 : ""}`;
    });
  }
}
