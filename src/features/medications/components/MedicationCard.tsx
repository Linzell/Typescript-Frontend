// src/features/medications/components/MedicationCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Medication } from '@/services/medication.service';
import { useTranslation } from 'react-i18next';

/**
 * Props for the MedicationCard component
 * @interface MedicationCardProps
 * @property {Medication} medication - The medication data to display
 * @property {(medication: Medication) => void} [onClick] - Optional click handler for the card
 */
interface MedicationCardProps {
  medication: Medication;
  onClick?: (medication: Medication) => void;
}

/**
 * Displays a card containing medication information
 * @param {MedicationCardProps} props - Component props
 * @returns {JSX.Element} Rendered medication card
 */
export function MedicationCard({ medication, onClick }: MedicationCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(medication)}
    >
      <CardHeader>
        <CardTitle className="text-lg">{medication.brandName}</CardTitle>
        <p className="text-sm text-gray-500">{medication.genericName}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">{t('medication.manufacturer')}:</span> {medication.labelerName}
          </p>
          <div className="flex flex-wrap gap-2">
            {medication.activeIngredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary" role="status">
                {ingredient.name} ({ingredient.strength})
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{medication.route}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
