import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMonth(month: number) {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  if (month < 1 || month > 12) {
    return "Invalid! month must be between 1 and 12";
  }

  return months[month - 1];
};

export const duplicateValidation = (arr: string[], el: string) => {
  if (!arr.find((item) => item === el)) {
    arr.push(el);
  } else {
    arr = arr.filter((item) => item !== el);
  }

  return arr;
};
