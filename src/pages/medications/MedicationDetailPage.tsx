// src/pages/medications/MedicationDetailPage.tsx
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useMedicationDetails } from '@/features/medications/hooks/useMedicationDetails';
import { MedicationDetailHeader } from '@/features/medications/components/MedicationDetailHeader';
import { ActiveIngredientsSection } from '@/features/medications/components/ActiveIngredientsSection';
import { PackagingSection } from '@/features/medications/components/PackagingSection';
import { AdministrationRoutes } from '@/features/medications/components/AdministrationRoutes';

/**
 * MedicationDetailPage component displays detailed information about a specific medication
 * including its active ingredients, administration routes, and packaging details.
 * Handles loading states, errors, and not found scenarios.
 */
export function MedicationDetailPage() {
  const { t } = useTranslation();
  const { medicationId } = useParams({ from: '/app/medications/$medicationId' });
  const { data: medication, isLoading, error } = useMedicationDetails(medicationId);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t('medications.detail.loading')}</title>
        </Helmet>
        <div className="container mx-auto py-8 space-y-8">
          <div className="flex justify-between items-center">
            <Link to="/app/medications">
              <Button variant="outline">← {t('common.backToMedications')}</Button>
            </Link>
          </div>
          <div className="flex items-center justify-center h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>{t('medications.detail.error')}</title>
        </Helmet>
        <div className="container mx-auto py-8 space-y-8">
          <div className="flex justify-between items-center">
            <Link to="/app/medications">
              <Button variant="outline">← {t('common.backToMedications')}</Button>
            </Link>
          </div>
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-red-500">{t('common.error')}: {error.message}</div>
          </div>
        </div>
      </>
    );
  }

  if (!medication?.id) {
    return (
      <>
        <Helmet>
          <title>{t('medications.detail.notFound')}</title>
        </Helmet>
        <div className="container mx-auto py-8 space-y-8">
          <div className="flex justify-between items-center">
            <Link to="/app/medications">
              <Button variant="outline">← {t('common.backToMedications')}</Button>
            </Link>
          </div>
          <div className="flex items-center justify-center h-[50vh]">
            <div>{t('medications.detail.medicationNotFound')}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{medication.brandName} - {t('medications.detail.title')}</title>
      </Helmet>

      <div className="container mx-auto py-8 space-y-8">
        <div className="flex justify-between items-center">
          <Link to="/app/medications">
            <Button variant="outline">← {t('common.backToMedications')}</Button>
          </Link>
        </div>

        <MedicationDetailHeader medication={medication} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActiveIngredientsSection ingredients={medication.activeIngredients} />
          <AdministrationRoutes route={medication.route} />
        </div>

        <PackagingSection packaging={medication.packaging} />
      </div>
    </>
  );
}
