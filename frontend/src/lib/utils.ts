import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* ✅ Tailwind helper */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ✅ Get full user name from localStorage */
export const getUserName = (): string => {
  return localStorage.getItem("userName") || "User";
};

/* ✅ Get clean first name (used in UI) */
export const getFirstName = (): string => {
  const name = localStorage.getItem("userName");
  if (!name) return "User";

  // Take first word & remove numbers
  return name.trim().split(" ")[0].replace(/[0-9]/g, "");
};

/* ✅ Get user role */
export const getUserRole = (): string | null => {
  return localStorage.getItem("userRole");
};
