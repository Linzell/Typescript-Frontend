// src/features/medications/hooks/useMedications.ts
import { useQuery } from '@tanstack/react-query';
import { Medication, MedicationService } from '@/services/medication.service';

/**
 * Response interface for paginated medications data
 */
export interface PaginatedMedicationsResponse {
  /** Array of medication objects */
  medications: Medication[];
  /** Total count of medications matching the query */
  total: number;
  /** Current page number */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
}

/**
 * Parameters for medications query
 */
interface UseMedicationsParams {
  /** Page number to fetch (1-based) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Optional search term to filter medications */
  search?: string;
  /** Optional route of administration filter */
  route?: string;
  /** Optional medication name filter */
  name?: string;
  /** Optional active ingredient filter */
  activeIngredient?: string;
}

/**
 * Hook to fetch paginated medications data with optional filters
 * @param params - Query parameters for fetching medications
 * @returns Query result containing paginated medications data
 */
export function useMedications(params: UseMedicationsParams) {
  return useQuery<PaginatedMedicationsResponse, Error>({
    queryKey: ['medications', params],
    queryFn: () => MedicationService.getMedications(params),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    retry: 2,
  });
}
