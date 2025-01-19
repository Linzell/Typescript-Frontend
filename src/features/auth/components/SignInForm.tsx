// src/features/auth/components/SignInForm.tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

/**
 * Schema for sign in form validation
 * @remarks Defines required email and password fields with validation rules
 */
const signInSchema = z.object({
  email: z.string().email('auth.errors.invalidEmail'),
  password: z.string().min(6, 'auth.errors.passwordLength'),
  redirectToPath: z.string().optional(),
});

/**
 * Type definition for sign in form data
 */
type SignInFormData = z.infer<typeof signInSchema>;

/**
 * Props for the SignInForm component
 */
interface SignInFormProps {
  /** Path to redirect to after successful sign in */
  redirectToPath?: string;
}

/**
 * A form component for user authentication
 * @param props - The component props
 * @param props.redirectToPath - Optional redirect path after successful login, defaults to '/'
 * @returns The rendered sign in form component
 */
export function SignInForm({ redirectToPath = '/' }: SignInFormProps) {
  const { t } = useTranslation();
  const { login: loginUser, isLoading, error } = useAuth();

  /**
   * Form hook configuration with validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  /**
   * Handles form submission
   * @param data - The form data to submit
   */
  const onSubmit = (data: SignInFormData) => {
    loginUser({ ...data, redirectToPath });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder={t('auth.form.emailPlaceholder')}
          aria-label={t('auth.form.emailLabel')}
        />
        {errors.email && errors.email.message && (
          <span className="text-red-500 text-sm">{t(errors.email.message)}</span>
        )}
      </div>

      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder={t('auth.form.passwordPlaceholder')}
          aria-label={t('auth.form.passwordLabel')}
        />
        {errors.password && errors.password.message && (
          <span className="text-red-500 text-sm">{t(errors.password.message)}</span>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error instanceof Error ? t(error.message) : t('auth.errors.generic')}
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? t('auth.form.signingIn') : t('auth.form.signIn')}
      </Button>
    </form>
  );
}
