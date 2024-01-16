import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertObjectToEnum<T extends object>(object:T){
  const [firstKey, ...values] = Object.keys(object) as (keyof typeof object)[]
  return [firstKey!, ...values] as const
}