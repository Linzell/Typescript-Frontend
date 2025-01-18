// src/pages/LogoutPage.tsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from '@tanstack/react-router';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutConfirmation } from '@/features/auth/components/LogoutConfirmation';
import { useTranslation } from 'react-i18next';

/**
 * LogoutPage component for handling user logout flow
 * Shows a confirmation dialog before logging out the user
 * @returns JSX.Element
 */
export function LogoutPage() {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const navigate = useNavigate();
  const logout = useLogout();
  const { t } = useTranslation();

  const handleConfirm = () => {
    logout.mutate();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    navigate({ to: '/' });
  };

  return (
    <>
      <Helmet>
        <title>{t('logout.pageTitle', 'Logout - Medication Manager')}</title>
      </Helmet>

      <LogoutConfirmation
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isLoading={logout.isLoading}
      />
    </>
  );
}
