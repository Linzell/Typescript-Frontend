// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * A custom hook that returns a debounced value which only updates after a specified delay.
 * Useful for reducing the frequency of expensive operations like API calls or state updates.
 *
 * @template T - The type of the value being debounced
 * @param {T} value - The value to debounce
 * @param {number} [delay=500] - The debounce delay in milliseconds
 * @returns {T} The debounced value that updates after the specified delay
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 300);
 *
 * // Effect only runs when debouncedSearch changes
 * useEffect(() => {
 *   // Make API call with debouncedSearch
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
