// src/features/medications/hooks/useMedicationDetails.ts
import { useQuery } from '@tanstack/react-query';
import { MedicationService } from '@/services/medication.service';

/**
 * Custom hook to fetch medication details by ID.
 * @param {string} id - The unique identifier of the medication.
 * @returns {UseQueryResult} Query result containing medication details.
 * @remarks
 * - Cache time (gcTime): 5 minutes
 * - Stale time: 1 minute
 */
export function useMedicationDetails(id: string) {
  return useQuery({
    queryKey: ['medication', id],
    queryFn: () => MedicationService.getMedicationById(id),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  });
}
