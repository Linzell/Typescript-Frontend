// src/features/medications/components/ActiveIngredientsSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ActiveIngredient } from '@/services/medication.service';
import { useTranslation } from 'react-i18next';

interface ActiveIngredientsSectionProps {
  /** List of active ingredients with their names and strengths */
  ingredients: ActiveIngredient[];
}

/**
 * Displays a table of active ingredients and their strengths in a card component
 * @param {ActiveIngredientsSectionProps} props - Component props
 * @param {ActiveIngredient[]} props.ingredients - Array of active ingredients to display
 */
export function ActiveIngredientsSection({ ingredients }: ActiveIngredientsSectionProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid="active-ingredients-title">
          {t('medications.activeIngredients.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead data-testid="name-column-header">
                {t('medications.activeIngredients.nameColumn')}
              </TableHead>
              <TableHead data-testid="strength-column-header">
                {t('medications.activeIngredients.strengthColumn')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.map((ingredient, index) => (
              <TableRow key={index} data-testid={`ingredient-row-${index}`}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>{ingredient.strength}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
