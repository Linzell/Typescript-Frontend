// src/lib/api-middleware.ts
import { AxiosError } from 'axios';

/**
 * Interface representing an API error response
 * @interface ApiError
 * @property {string} message - Human readable error message
 * @property {string} code - Error code identifier
 * @property {number} status - HTTP status code
 */
export interface ApiError {
  message: string;
  code: string;
  status: number;
}

/**
 * Handles axios errors and formats them into a consistent ApiError object
 * @param {AxiosError} error - The axios error object
 * @returns {ApiError} Formatted error object with message, code and status
 */
export const handleApiError = (
  error: AxiosError,
  translations: { generic: string; network: string }
): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || translations.generic,
      code: error.response.data?.code || 'UNKNOWN_ERROR',
      status: error.response.status,
    };
  }
  return {
    message: translations.network,
    code: 'NETWORK_ERROR',
    status: 0,
  };
};
