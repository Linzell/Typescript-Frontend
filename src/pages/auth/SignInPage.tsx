// src/pages/auth/SignInPage.tsx
import { Helmet } from 'react-helmet-async';
import { SignInForm } from '@/features/auth/components/SignInForm';
import { Link, useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

/**
 * Sign in page component that handles user authentication
 * Displays the sign in form and provides navigation to sign up
 * @returns {JSX.Element} Rendered sign in page
 */
export function SignInPage() {
  const { t } = useTranslation();
  const { redirectToPath = '/' } = useSearch({
    from: '/public/auth/sign-in',
  });

  return (
    <>
      <Helmet>
        <title>{t('auth.signIn.pageTitle', 'Sign In - Medication Manager')}</title>
      </Helmet>

      <div className="w-full h-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8 py-12">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('auth.signIn.title', 'Sign in to your account')}
            </h2>
          </div>

          <SignInForm redirectToPath={redirectToPath} />

          <div className="text-center">
            <Link
              to="/auth/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('auth.signIn.signUpLink', "Don't have an account? Sign up")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
