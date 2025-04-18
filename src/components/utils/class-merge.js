import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* Функция принимает массив классов,
 * объединяет их с помощью clsx и сопоставляет полученные имена классов с классами Tailwind
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
