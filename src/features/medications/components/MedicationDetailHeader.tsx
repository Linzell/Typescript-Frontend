// src/features/medications/components/MedicationDetailHeader.tsx
import { Medication } from '@/services/medication.service';
import { useTranslation } from 'react-i18next';

/**
 * Props for the MedicationDetailHeader component
 */
interface MedicationDetailHeaderProps {
  /** The medication data to display */
  medication: Medication;
}

/**
 * Component that displays the header information for a medication detail view
 * @param medication - The medication data to display
 */
export function MedicationDetailHeader({ medication }: MedicationDetailHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{medication.brandName}</h1>
      <div className="space-y-2">
        <p className="text-xl text-gray-600">{medication.genericName}</p>
        <p className="text-lg">
          {t('medications.manufacturedBy', { manufacturer: medication.labelerName })}
        </p>
      </div>
    </div>
  );
}
