import { useAuth } from './useAuth';

/**
 * A custom hook for handling logout functionality.
 * Extracts the logout method from the auth context.
 *
 * @returns {Object} An object containing the logout function
 * @returns {Function} logout - Function to handle user logout
 */
export function useLogout() {
  const { logout } = useAuth();
  return { logout };
}
