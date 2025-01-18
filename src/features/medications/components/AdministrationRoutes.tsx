// src/features/medications/components/AdministrationRoutes.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

/**
 * Props for the AdministrationRoutes component
 * @interface AdministrationRoutesProps
 * @property {string} route - The administration route of the medication
 */
interface AdministrationRoutesProps {
  route: string;
}

/**
 * Component that displays the administration route of a medication
 * @param {AdministrationRoutesProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export function AdministrationRoutes({ route }: AdministrationRoutesProps) {
  const { t } = useTranslation();

  return (
    <Card data-testid="administration-route-card">
      <CardHeader>
        <CardTitle data-testid="administration-route-title">
          {t('medications.administrationRoute.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge data-testid="route-badge" variant="secondary">
            {route}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
