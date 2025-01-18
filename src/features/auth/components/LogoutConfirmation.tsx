// src/features/auth/components/LogoutConfirmation.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTranslation } from 'react-i18next';

/**
 * Props for the LogoutConfirmation component
 * @interface LogoutConfirmationProps
 * @property {boolean} isOpen - Whether the confirmation dialog is open
 * @property {() => void} onConfirm - Callback function when logout is confirmed
 * @property {() => void} onCancel - Callback function when logout is canceled
 * @property {boolean} isLoading - Whether the logout action is in progress
 */
interface LogoutConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

/**
 * A confirmation dialog component for logging out
 * @param {LogoutConfirmationProps} props - The component props
 * @returns {JSX.Element} The LogoutConfirmation component
 */
export function LogoutConfirmation({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: LogoutConfirmationProps) {
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('auth.logout.confirmTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('auth.logout.confirmMessage')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
            {t('common.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? t('auth.logout.loggingOut') : t('auth.logout.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
