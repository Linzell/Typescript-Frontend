// src/features/auth/hooks/useRegister.ts
import { useNavigate } from '@tanstack/react-router';
import { useAuthContext } from '@/providers/auth-provider';
import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { handleApiError } from '@/lib/api-middleware';

export function useRegister() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuthContext();

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
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    error: registerMutation.error
  };
}
