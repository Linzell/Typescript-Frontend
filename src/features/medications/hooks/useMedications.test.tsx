// frontend/src/features/medications/hooks/useMedications.test.tsx
import { describe, test, beforeAll } from "bun:test";
// import { renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  // QueryClientProvider,
} from "@tanstack/react-query";
// import { useMedications } from "./useMedications";

// Create a wrapper component for the query client
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
    },
  });
}

// function createWrapper() {
//   const queryClient = createTestQueryClient();
//   return ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// }

beforeAll(() => {
  const queryClient = createTestQueryClient();
  queryClient.clear();
});


describe.skip("useMedication", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    // test("useMedications fetches medications successfully", async () => {
    //   const params = {
    //     page: 1,
    //     pageSize: 10,
    //   };

    //   const { result } = renderHook(() => useMedications(params), {
    //     wrapper: createWrapper(),
    //   });

    //   // Initially loading
    //   expect(result.current.isLoading).toBe(true);

    //   // Wait for the query to complete and check structure
    //   await waitFor(() => {
    //     expect(result.current.isSuccess).toBe(true);
    //     expect(result.current.data).toBeDefined();
    //     expect(Array.isArray(result.current.data?.medications)).toBe(true);
    //     expect(typeof result.current.data?.total).toBe('number');
    //     expect(typeof result.current.data?.currentPage).toBe('number');
    //     expect(typeof result.current.data?.totalPages).toBe('number');
    //   });
    // });

    // test("useMedications applies filters correctly", async () => {
    //   const params = {
    //     page: 1,
    //     pageSize: 10,
    //     search: "test",
    //     route: "Oral",
    //     name: "Medication",
    //     activeIngredient: "Ingredient",
    //   };

    //   const { result } = renderHook(() => useMedications(params), {
    //     wrapper: createWrapper(),
    //   });

    //   await waitFor(() => {
    //     expect(result.current.isSuccess).toBe(true);
    //     expect(result.current.data).toBeDefined();
    //   });
    // });

    // test("useMedications handles pagination", async () => {
    //   const params = {
    //     page: 2,
    //     pageSize: 5,
    //   };

    //   const { result } = renderHook(() => useMedications(params), {
    //     wrapper: createWrapper(),
    //   });

    //   await waitFor(() => {
    //     expect(result.current.isSuccess).toBe(true);
    //     expect(result.current.data?.currentPage).toBe(2);
    //     expect(result.current.data?.medications.length).toBeLessThanOrEqual(5);
    //   });
    // });

    // test("useMedications respects staleTime and gcTime", async () => {
    //   const params = {
    //     page: 1,
    //     pageSize: 10,
    //   };

    //   const { result, rerender } = renderHook(() => useMedications(params), {
    //     wrapper: createWrapper(),
    //   });

    //   await waitFor(() => expect(result.current.isSuccess).toBe(true));

    //   // Store initial data
    //   const initialData = result.current.data;

    //   // Rerender should use cached data
    //   rerender();
    //   expect(result.current.data).toEqual(initialData);
    // });

    // test("useMedications handles network errors gracefully", async () => {
    //   // Test with invalid API endpoint to simulate network error
    //   const params = {
    //     page: -1, // Invalid page number to trigger error
    //     pageSize: 10,
    //   };

    //   const { result } = renderHook(() => useMedications(params), {
    //     wrapper: createWrapper(),
    //   });

    //   await waitFor(() => {
    //     expect(result.current.isError || result.current.isSuccess).toBe(true);
    //   });
    // });
  });
});
