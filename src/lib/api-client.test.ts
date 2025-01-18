// frontend/src/lib/api-client.test.ts
import { describe, test, mock, beforeAll, afterEach } from "bun:test";
// import { axiosInstance, API_BASE_URL, queryClient } from "./api-client";

// Mock external dependencies
const mockNavigate = mock(() => { });
const mockClearAuth = mock(() => { });

mock("@/providers/auth-provider", () => ({
  useAuthContext: () => ({
    clearAuth: mockClearAuth,
  }),
}));

mock("@/providers/router-provider", () => ({
  router: {
    navigate: mockNavigate,
  },
}));

mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// beforeAll(() => {
//   // Setup window.location
//   global.window = {
//     location: {
//       pathname: "/test-path",
//     },
//   } as any;
// });

afterEach(() => {
  mockNavigate.mock.calls = [];
  mockClearAuth.mock.calls = [];
});

describe.skip("api-client", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    // test("axiosInstance is configured with correct base URL", () => {
    //   expect(axiosInstance.defaults.baseURL).toBe(API_BASE_URL);
    // });

    // test("axiosInstance is configured with correct default headers", () => {
    //   expect(axiosInstance.defaults.headers.common["Content-Type"]).toBe("application/json");
    // });

    // test("axiosInstance is configured with credentials", () => {
    //   expect(axiosInstance.defaults.withCredentials).toBe(true);
    // });

    // test("queryClient is configured with correct default options", () => {
    //   const defaultOptions = queryClient.getDefaultOptions();

    //   expect(defaultOptions.queries?.staleTime).toBe(5 * 60 * 1000);
    //   expect(defaultOptions.queries?.retry).toBe(1);
    //   expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
    // });

    // test("interceptor handles 401 unauthorized response", async () => {
    //   // Create a mock unauthorized error response
    //   const unauthorizedError = {
    //     response: {
    //       status: 401,
    //     },
    //   };

    //   try {
    //     // Trigger the interceptor by rejecting with unauthorized error
    //     await axiosInstance.interceptors.response.handlers[0].rejected(unauthorizedError);
    //   } catch (error) {
    //     // Verify that clearAuth was called
    //     expect(mockClearAuth).toHaveBeenCalled();

    //     // Verify that navigate was called with correct parameters
    //     expect(mockNavigate).toHaveBeenCalledWith({
    //       to: '/auth/sign-in',
    //       search: { redirectToPath: '/test-path' },
    //     });
    //   }
    // });

    // test("interceptor passes through non-401 errors", async () => {
    //   const otherError = {
    //     response: {
    //       status: 500,
    //     },
    //   };

    //   try {
    //     await axiosInstance.interceptors.response.handlers[0].rejected(otherError);
    //   } catch (error) {
    //     // Verify that clearAuth and navigate were not called
    //     expect(mockClearAuth).not.toHaveBeenCalled();
    //     expect(mockNavigate).not.toHaveBeenCalled();

    //     // Verify that the error was passed through
    //     expect(error).toEqual(otherError);
    //   }
    // });

    // test("API_BASE_URL falls back to localhost when env variable is not set", () => {
    //   // Temporarily clear the environment variable
    //   const originalEnv = process.env.VITE_BACKEND_URL;
    //   process.env.VITE_BACKEND_URL = undefined;

    //   // Re-import to test fallback
    //   const { API_BASE_URL: fallbackUrl } = require("./api-client");

    //   expect(fallbackUrl).toBe("http://localhost:3000");

    //   // Restore the environment variable
    //   process.env.VITE_BACKEND_URL = originalEnv;
    // });

    // test("axiosInstance makes requests with correct configuration", async () => {
    //   // Mock axios request
    //   const mockResponse = { data: { test: true } };
    //   mock.module("axios", () => ({
    //     create: () => ({
    //       get: mock(() => Promise.resolve(mockResponse)),
    //     }),
    //   }));

    //   const response = await axiosInstance.get("/test-endpoint");

    //   expect(response).toEqual(mockResponse);
    // });
  });
});
