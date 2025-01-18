/**
 * @file API client configuration and setup
 * @module api-client
 */

import { QueryClient } from '@tanstack/react-query';
import { useAuthContext } from '@/providers/auth-provider';
import { router } from '@/providers/router-provider';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

/**
 * Base URL for API requests, defaults to localhost if not set in environment
 */
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

if (!API_BASE_URL) {
  console.warn('VITE_BACKEND_URL is not defined in environment variables');
}

/**
 * Configured axios instance for making API requests
 */
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add response interceptor to handle unauthorized responses
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authContext = useAuthContext();
      const { t } = useTranslation();

      authContext.clearAuth();
      router.navigate({
        to: '/auth/sign-in',
        search: { redirectToPath: window.location.pathname },
      });

      console.warn(t('errors.unauthorized'));
    }
    return Promise.reject(error);
  }
);

/**
 * Configured React Query client with default options
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
