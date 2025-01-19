// src/features/auth/hooks/useAuth.ts
import { useNavigate } from '@tanstack/react-router';
import { useAuthContext } from '@/providers/auth-provider';
import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
      clearAuth();
      toast.error(error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      clearAuth();
      navigate({ to: '/auth/sign-in' });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error?.message || logoutMutation.error?.message,
  };
}
