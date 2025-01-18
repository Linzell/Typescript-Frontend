/**
 * Combines and merges Tailwind CSS classes with clsx and tailwind-merge
 * for optimal class name handling and deduplication.
 *
 * @param {...ClassValue[]} inputs - Array of class values to be merged
 * @returns {string} Merged and optimized class string
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
