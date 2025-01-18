// frontend/src/services/medication.service.test.ts
import { expect, test, mock, beforeEach } from "bun:test";
import { MedicationService } from "./medication.service";
import { axiosInstance } from "@/lib/api-client";
import type { GetMedicationsParams } from "./medication.service";

// Create mock function for axios get
const getMock = mock(() => Promise.resolve({ data: {} }));

// Mock axiosInstance
mock.module("@/lib/api-client", () => ({
  axiosInstance: {
    get: getMock
  }
}));

// Sample data for testing
const mockMedication = {
  id: "med123",
  brandName: "TestMed",
  genericName: "TestGeneric",
  labelerName: "TestLab",
  activeIngredients: [
    { name: "Ingredient1", strength: "10mg" }
  ],
  route: "oral",
  packaging: ["bottle", "blister"]
};

const mockPaginatedResponse = {
  medications: [mockMedication],
  total: 1,
  currentPage: 1,
  totalPages: 1,
  hasMore: false
};

beforeEach(() => {
  // Reset mock using mockReset()
  getMock.mockReset();
});

test("getMedications fetches and parses paginated medications correctly", async () => {
  getMock.mockImplementation(() => Promise.resolve({ data: mockPaginatedResponse }));

  const params = {
    page: 1,
    pageSize: 10,
    search: "test"
  };

  const result = await MedicationService.getMedications(params);

  expect(getMock).toHaveBeenCalledWith("/api/v1/medications", {
    params,
    withCredentials: true
  });

  expect(Array.isArray(result.medications)).toBe(true);
  expect(typeof result.total).toBe("number");
  expect(typeof result.currentPage).toBe("number");
  expect(typeof result.totalPages).toBe("number");
  expect(typeof result.hasMore).toBe("boolean");

  const medication = result.medications[0];
  expect(medication.id).toBe(mockMedication.id);
  expect(medication.brandName).toBe(mockMedication.brandName);
  expect(Array.isArray(medication.activeIngredients)).toBe(true);
});

test("getMedicationById fetches and parses single medication correctly", async () => {
  getMock.mockImplementation(() => Promise.resolve({ data: mockMedication }));

  const medicationId = "med123";
  const result = await MedicationService.getMedicationById(medicationId);

  expect(getMock).toHaveBeenCalledWith(`/api/v1/medications/${medicationId}`, {
    withCredentials: true
  });

  expect(result.id).toBe(mockMedication.id);
  expect(result.brandName).toBe(mockMedication.brandName);
  expect(result.genericName).toBe(mockMedication.genericName);
  expect(result.labelerName).toBe(mockMedication.labelerName);
  expect(Array.isArray(result.activeIngredients)).toBe(true);
  expect(result.route).toBe(mockMedication.route);
  expect(Array.isArray(result.packaging)).toBe(true);
});

test("getMedications handles API errors correctly", async () => {
  getMock.mockImplementation(() => Promise.reject(new Error("API Error")));

  await expect(MedicationService.getMedications({}))
    .rejects
    .toThrow("API Error");
});

test("getMedicationById handles API errors correctly", async () => {
  getMock.mockImplementation(() => Promise.reject(new Error("API Error")));

  await expect(MedicationService.getMedicationById("med123"))
    .rejects
    .toThrow("API Error");
});

test("getMedications validates response data", async () => {
  getMock.mockImplementation(() => Promise.resolve({
    data: {
      medications: [{ id: "med123" }]
    }
  }));

  await expect(MedicationService.getMedications({}))
    .rejects
    .toThrow();
});

test("getMedicationById validates response data", async () => {
  getMock.mockImplementation(() => Promise.resolve({
    data: { id: "med123" }
  }));

  await expect(MedicationService.getMedicationById("med123"))
    .rejects
    .toThrow();
});

test("getMedications handles empty response correctly", async () => {
  getMock.mockImplementation(() => Promise.resolve({
    data: {
      medications: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
      hasMore: false
    }
  }));

  const result = await MedicationService.getMedications({});

  expect(Array.isArray(result.medications)).toBe(true);
  expect(result.medications.length).toBe(0);
  expect(result.total).toBe(0);
});

test("getMedications handles all query parameters", async () => {
  getMock.mockImplementation(() => Promise.resolve({ data: mockPaginatedResponse }));

  const params: GetMedicationsParams = {
    page: 1,
    pageSize: 10,
    search: "test",
    route: "oral",
    name: "TestMed",
    activeIngredient: "Ingredient1"
  };

  await MedicationService.getMedications(params);

  expect(getMock).toHaveBeenCalledWith("/api/v1/medications", {
    params,
    withCredentials: true
  });
});
