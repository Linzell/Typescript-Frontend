// src/services/auth.service.ts
import { axiosInstance } from '@/lib/api-client';
import { z } from 'zod';

/**
 * Interface for login/register response
 * @interface AuthResponse
 * @property {string} message - Response message
 * @property {string} [error] - Optional error message
 */
const ApiResponseSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

/**
 * Interface for login credentials
 * @interface LoginCredentials
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {string} [redirectToPath] - Optional path to redirect after login
 */
export interface LoginCredentials {
  email: string;
  password: string;
  redirectToPath?: string;
}

/**
 * Interface for registration credentials
 * @interface RegisterCredentials
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {string} name - User's display name
 */
export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

/**
 * Service class handling authentication operations
 */
export class AuthService {
  /**
   * Authenticates a user with their credentials
   * @param {LoginCredentials} credentials - User login credentials
   * @returns {Promise<AuthResponse>} Promise with login response containing message or error
   */
  static async login(credentials: LoginCredentials): Promise<ApiResponse> {
    return axiosInstance.post("/auth/login", credentials, { withCredentials: true })
      .then(({ data }) => {
        const parsed = ApiResponseSchema.parse(data);
        if (parsed.error) {
          throw new Error(parsed.error);
        }
        return { message: parsed.message };
      })
      .catch(error => {
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
        throw new Error(error.message || 'Login failed');
      });
  }

  /**
   * Registers a new user
   * @param {RegisterCredentials} credentials - User registration credentials
   * @returns {Promise<AuthResponse>} Promise with registration response containing message or error
   */
  static async register(credentials: RegisterCredentials): Promise<ApiResponse> {
    return axiosInstance.post("/auth/register", credentials, { withCredentials: true })
      .then(({ data }) => {
        const parsed = ApiResponseSchema.parse(data);
        if (parsed.error) {
          throw new Error(parsed.error);
        }
        return { message: parsed.message };
      })
      .catch(error => {
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
        throw new Error(error.message || 'Registration failed');
      });
  }

  /**
   * Logs out the current user and cleans up local storage
   * @returns {Promise<AuthResponse>} Promise with logout response containing message or error
   */
  static async logout(): Promise<ApiResponse> {
    return axiosInstance.post("/auth/logout", {}, { withCredentials: true })
      .then(({ data }) => {
        const parsed = ApiResponseSchema.parse(data);
        if (parsed.error) {
          throw new Error(parsed.error);
        }
        return { message: parsed.message };
      })
      .catch(error => {
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
        throw new Error(error.message || 'Logout failed');
      });
  }
}
