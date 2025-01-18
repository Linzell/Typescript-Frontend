// src/services/auth.service.ts
import { axiosInstance } from '@/lib/api-client';
import { z } from 'zod';

/**
 * Schema for validating login/register response from API
 */
const LoginResponseSchema = z.object({
  message: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

/**
 * Interface for login credentials
 * @interface LoginCredentials
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {string} [redirectToPath] - Optional path to redirect after login
 */
interface LoginCredentials {
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
interface RegisterCredentials {
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
   * @throws {Error} When authentication fails
   * @returns {Promise<LoginResponse>} Promise with login response containing message
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await axiosInstance.post(
      "/auth/login",
      credentials,
      { withCredentials: true }
    );
    return LoginResponseSchema.parse(data);
  }

  /**
   * Registers a new user
   * @param {RegisterCredentials} credentials - User registration credentials
   * @throws {Error} When registration fails
   * @returns {Promise<LoginResponse>} Promise with registration response containing message
   */
  static async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    const { data } = await axiosInstance.post(
      "/auth/register",
      credentials,
      { withCredentials: true }
    );
    return LoginResponseSchema.parse(data);
  }

  /**
   * Logs out the current user and cleans up local storage
   * @throws {Error} When logout request fails
   * @returns {Promise<void>} Promise that resolves when logout is complete
   */
  static async logout(): Promise<void> {
    await axiosInstance.post(
      "/auth/logout",
      { withCredentials: true }
    );
    localStorage.removeItem('token');
  }
}
