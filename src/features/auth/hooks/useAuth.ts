// src/features/auth/hooks/useAuth.ts
import { useNavigate } from '@tanstack/react-router';
import { useAuthContext } from '@/providers/auth-provider';
import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { handleApiError } from '@/lib/api-middleware';

/**
 * Hook that provides authentication functionality including login, logout and registration
 * @returns {Object} Authentication methods and state
 * @property {Function} login - Function to log user in
 * @property {Function} logout - Function to log user out
 * @property {Function} register - Function to register new user
 * @property {boolean} isLoading - Whether any auth operation is in progress
 * @property {Error | null} error - Any error from auth operations
 */
export function useAuth() {
  const navigate = useNavigate();
  const { setAuthenticated, clearAuth, isAuthenticated } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (_, variables) => {
      setAuthenticated(true);
      const { redirectToPath = '/app/medications' } = variables;
      if (isAuthenticated) {
        navigate({
          to: redirectToPath,
          replace: true
        });
      }
    },
    onError: (error: Error) => {
      console.error('Login error:', handleApiError(error as any));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      clearAuth();
      navigate({ to: '/auth/sign-in' });
    },
    onError: (error: Error) => {
      console.error('Logout error:', handleApiError(error as any));
    },
  });

  const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      setAuthenticated(true);
      navigate({ to: '/app/medications' });
    },
    onError: (error: Error) => {
      console.error('Register error:', handleApiError(error as any));
    },
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    register: registerMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || logoutMutation.error || registerMutation.error,
  };
}
