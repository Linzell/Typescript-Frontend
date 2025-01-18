// src/features/medications/components/PackagingSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PackagingSectionProps {
  packaging: string[];
}

export function PackagingSection({ packaging }: PackagingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Packaging</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {packaging.map((pkg, index) => (
            <li key={index} className="border-b last:border-0 pb-4 last:pb-0">
              <p className="font-medium">{pkg}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
