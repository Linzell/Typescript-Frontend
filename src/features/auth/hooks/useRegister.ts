// src/features/auth/hooks/useRegister.ts
import { useNavigate } from '@tanstack/react-router';
import { useAuthContext } from '@/providers/auth-provider';
import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

/**
 * Hook for handling user registration functionality
 * @returns {Object} Object containing register function, loading state and error message
 * @returns {Function} register - Function to trigger registration mutation
 * @returns {boolean} isLoading - Loading state of registration request
 * @returns {string|undefined} error - Error message if registration failed
 */
export function useRegister() {
  const navigate = useNavigate();
  const { setAuthenticated, clearAuth } = useAuthContext();

  const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      setAuthenticated(true);
      navigate({ to: '/app/medications' });
    },
    onError: (error: Error) => {
      clearAuth();
      toast.error(error.message);
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    error: registerMutation.error?.message,
  };
}
