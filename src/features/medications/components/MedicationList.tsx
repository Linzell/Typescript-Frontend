// src/features/medications/components/MedicationList.tsx
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaginationComponent } from '@/components/common/pagination';
import { MedicationCard } from './MedicationCard';
import { useMedications } from '../hooks/useMedications';
import { useNavigate } from '@tanstack/react-router';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 12;
const DEBOUNCE_DELAY = 300; // 300ms delay

const ROUTE_OPTIONS = [
  { value: 'ALL', label: 'medications.routes.all' },
  { value: 'ORAL', label: 'medications.routes.oral' },
  { value: 'TOPICAL', label: 'medications.routes.topical' },
  { value: 'INTRAVENOUS', label: 'medications.routes.intravenous' },
  { value: 'INTRAMUSCULAR', label: 'medications.routes.intramuscular' },
] as const;

type RouteOption = typeof ROUTE_OPTIONS[number]['value'];

/**
 * MedicationList component displays a filterable, paginated list of medications
 * with search, route selection and active ingredient filtering capabilities
 */
export function MedicationList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // Input states (immediate updates for UI)
  const [searchInput, setSearchInput] = useState('');
  const [activeIngredientInput, setActiveIngredientInput] = useState('');

  // Debounced values (for API calls)
  const debouncedSearch = useDebounce(searchInput, DEBOUNCE_DELAY);
  const debouncedActiveIngredient = useDebounce(activeIngredientInput, DEBOUNCE_DELAY);

  const [route, setRoute] = useState<RouteOption>('ALL');

  const { data, isLoading, error } = useMedications({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedSearch,
    route: route === 'ALL' ? undefined : route,
    name: debouncedSearch,
    activeIngredient: debouncedActiveIngredient,
  });

  /**
   * Handles navigation to medication details page
   */
  const handleMedicationClick = (medicationId: string) => {
    navigate({
      to: '/app/medications/$medicationId',
      params: { medicationId }
    });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, debouncedActiveIngredient, route]);

  /**
   * Handles route filter selection changes
   */
  const handleRouteChange = (value: string) => {
    setRoute(value as RouteOption);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        {t('medications.error', { message: error.message })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder={t('medications.search.placeholder')}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm"
        />

        <Select value={route} onValueChange={handleRouteChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              {t(ROUTE_OPTIONS.find(option => option.value === route)?.label || '')}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ROUTE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder={t('medications.activeIngredient.placeholder')}
          value={activeIngredientInput}
          onChange={(e) => setActiveIngredientInput(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading && data?.medications ? (
        <div className="opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                onClick={() => handleMedicationClick(medication.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.medications.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              onClick={() => handleMedicationClick(medication.id)}
            />
          ))}
        </div>
      )}

      <PaginationComponent
        currentPage={page}
        totalPages={Math.ceil((data?.total ?? 0) / PAGE_SIZE)}
        onPageChange={setPage}
      />
    </div>
  );
}
