// src/features/auth/components/SignUpForm.tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegister } from '../hooks/useRegister';
import { useTranslation } from 'react-i18next';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

/**
 * Sign up form component that handles new user registration
 *
 * @component
 * @returns {JSX.Element} Rendered sign up form
 */
export function SignUpForm() {
  const { t } = useTranslation();
  const { register: registerUser, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  /**
   * Handles form submission
   * @param {SignUpFormData} data - Form data to be submitted
   */
  const onSubmit = (data: SignUpFormData) => {
    const { confirmPassword, ...registrationData } = data;
    registerUser(registrationData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name')}
          type="text"
          placeholder={t('auth.signup.namePlaceholder')}
          aria-label={t('auth.signup.nameLabel')}
        />
        {errors.name && errors.name.message && (
          <span className="text-red-500 text-sm">{t(errors.name.message)}</span>
        )}
      </div>

      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder={t('auth.signup.emailPlaceholder')}
          aria-label={t('auth.signup.emailLabel')}
        />
        {errors.email && errors.email.message && (
          <span className="text-red-500 text-sm">{t(errors.email.message)}</span>
        )}
      </div>

      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder={t('auth.signup.passwordPlaceholder')}
          aria-label={t('auth.signup.passwordLabel')}
        />
        {errors.password && errors.password.message && (
          <span className="text-red-500 text-sm">{t(errors.password.message)}</span>
        )}
      </div>

      <div>
        <Input
          {...register('confirmPassword')}
          type="password"
          placeholder={t('auth.signup.confirmPasswordPlaceholder')}
          aria-label={t('auth.signup.confirmPasswordLabel')}
        />
        {errors.confirmPassword && errors.confirmPassword.message && (
          <span className="text-red-500 text-sm">{t(errors.confirmPassword.message)}</span>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error instanceof Error ? t(error.message) : t('auth.signup.genericError')}
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('auth.signup.loading') : t('auth.signup.submit')}
      </Button>
    </form>
  );
}
