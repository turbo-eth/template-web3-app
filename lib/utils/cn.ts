import clsx, { ClassArray } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassArray) {
  return twMerge(clsx(...inputs))
}
