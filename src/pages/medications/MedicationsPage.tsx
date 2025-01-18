// src/pages/medications/MedicationsPage.tsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MedicationList } from '@/features/medications/components/MedicationList';

/**
 * MedicationsPage component displays the main medications management page.
 * It includes a list of medications and handles the page title management.
 *
 * @returns {JSX.Element} The rendered medications page
 */
export function MedicationsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('medications.pageTitle', 'Medications - Medication Manager')}</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{t('medications.title', 'Medications')}</h1>
        <MedicationList />
      </div>
    </>
  );
}
