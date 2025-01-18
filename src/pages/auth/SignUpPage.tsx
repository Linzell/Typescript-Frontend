// src/pages/auth/SignUpPage.tsx
import { Helmet } from 'react-helmet-async';
import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

/**
 * SignUpPage component that renders the user registration page.
 * Includes a sign up form and a link to the sign in page for existing users.
 * Uses i18n for translations and Helmet for managing document head.
 * @returns {JSX.Element} The SignUpPage component
 */
export function SignUpPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('signup.pageTitle', 'Sign Up - Medication Manager')}</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('signup.createAccount', 'Create your account')}
            </h2>
          </div>

          <SignUpForm />

          <div className="text-center">
            <Link
              to="/auth/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('signup.signInLink', 'Already have an account? Sign in')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
