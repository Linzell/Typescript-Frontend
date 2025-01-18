// frontend/src/features/auth/hooks/useRegister.test.tsx
import { describe, test, mock, beforeAll, afterEach } from "bun:test";
// import { renderHook } from "@testing-library/react";
// import { useRegister } from "./useRegister";
import {
  QueryClient,
  // QueryClientProvider,
} from "@tanstack/react-query";
import { JSDOM } from "jsdom";

// Setup DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;

// Mocks
const mockNavigate = mock(() => { });
mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

const mockAuthService = {
  login: mock(async () => ({ token: "test-token" })),
  logout: mock(async () => { }),
  register: mock(async () => ({ token: "test-token" })),
};

mock("@/services/auth.service", () => ({
  AuthService: mockAuthService,
}));

// Test setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockSetAuthenticated = mock(() => { });
const mockClearAuth = mock(() => { });

// const wrapper = ({ children }: { children: React.ReactNode }) => (
//   <QueryClientProvider client={queryClient} >
//     <AuthContext.Provider
//       value={{
//         isAuthenticated: false,
//         setAuthenticated: mockSetAuthenticated,
//         clearAuth: mockClearAuth,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   </QueryClientProvider>
// );

beforeAll(() => {
  console.error = mock(() => { });
});

afterEach(() => {
  queryClient.clear();
  mockNavigate.mockClear();
  mockSetAuthenticated.mockClear();
  mockClearAuth.mockClear();
});

describe.skip("useRegister", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    // test("useRegister successful registration", async () => {
    //   const { result } = renderHook(() => useRegister(), { wrapper });

    //   result.current.register({
    //     email: "test@test.com",
    //     password: "password123",
    //     name: "Test User"
    //   });

    //   expect(mockSetAuthenticated).toBeCalled();
    //   expect(mockNavigate).toHaveBeenCalledWith({ to: "/app/medications" });
    // });

    // test("useRegister handles error", async () => {
    //   mockAuthService.register.mockImplementationOnce(() => {
    //     throw new Error("Registration failed");
    //   });

    //   const { result } = renderHook(() => useRegister(), { wrapper });

    //   result.current.register({
    //     email: "error@test.com",
    //     password: "password123",
    //     name: "Error User"
    //   });

    //   expect(result.current.error).toBeDefined();
    // });

    // test("useRegister loading state", () => {
    //   const { result } = renderHook(() => useRegister(), { wrapper });

    //   expect(result.current.isLoading).toBe(false);
    // });
  });
});
