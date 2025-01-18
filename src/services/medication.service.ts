// src/services/medication.service.ts
import { axiosInstance } from '@/lib/api-client';
import { z } from 'zod';

/**
 * Schema for medication active ingredient
 * @property {string} name - Name of the active ingredient
 * @property {string} strength - Strength/dosage of the active ingredient
 */
const ActiveIngredientSchema = z.object({
  name: z.string(),
  strength: z.string(),
});

/**
 * Schema for medication details
 * @property {string} id - Unique identifier
 * @property {string} brandName - Brand/trade name of medication
 * @property {string} genericName - Generic/scientific name
 * @property {string} labelerName - Manufacturer/labeler
 * @property {ActiveIngredient[]} activeIngredients - List of active ingredients
 * @property {string} route - Administration route
 * @property {string[]} packaging - Available packaging options
 */
const MedicationSchema = z.object({
  id: z.string(),
  brandName: z.string().default(''),
  genericName: z.string(),
  labelerName: z.string(),
  activeIngredients: z.array(ActiveIngredientSchema),
  route: z.string().default(''),
  packaging: z.array(z.string()).default([]),
});

/**
 * Schema for paginated medication response
 * @property {Medication[]} medications - Array of medication records
 * @property {number} total - Total count of all medications
 * @property {number} currentPage - Current page number
 * @property {number} totalPages - Total number of pages
 * @property {boolean} hasMore - Whether more pages exist
 */
const PaginatedResponseSchema = z.object({
  medications: z.array(MedicationSchema),
  total: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  hasMore: z.boolean()
});

// Types
export type Medication = z.infer<typeof MedicationSchema>;
export type ActiveIngredient = z.infer<typeof ActiveIngredientSchema>;
export type PaginatedResponse = z.infer<typeof PaginatedResponseSchema>;

/**
 * Parameters for medication list query
 * @property {number} [page] - Page number for pagination
 * @property {number} [pageSize] - Number of items per page
 * @property {string} [search] - Search term for medications
 * @property {string} [route] - Filter by administration route
 * @property {string} [name] - Filter by medication name
 * @property {string} [activeIngredient] - Filter by active ingredient
 */
export interface GetMedicationsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  route?: string;
  name?: string;
  activeIngredient?: string;
}

/**
 * Service class for medication-related API operations
 */
export class MedicationService {

  /**
   * Fetches a paginated list of medications
   * @param {GetMedicationsParams} params - Query parameters for pagination and filtering
   * @returns {Promise<PaginatedResponse>} Promise with paginated medications response
   * @throws {Error} If the request fails or response validation fails
   */
  static async getMedications(params: GetMedicationsParams): Promise<PaginatedResponse> {
    const { data } = await axiosInstance.get('/api/v1/medications', {
      params,
      withCredentials: true
    });
    return PaginatedResponseSchema.parse(data);
  }

  /**
   * Fetches a specific medication by ID
   * @param {string} id - Medication ID to retrieve
   * @returns {Promise<Medication>} Promise with medication details
   * @throws {Error} If the request fails or response validation fails
   */
  static async getMedicationById(id: string): Promise<Medication> {
    const { data } = await axiosInstance.get(`/api/v1/medications/${id}`, {
      withCredentials: true
    });
    return MedicationSchema.parse(data);
  }
}
