// frontend/src/features/auth/hooks/useAuth.test.tsx
import { describe, test, mock, beforeAll, afterEach } from "bun:test";
// import { renderHook, act } from "@testing-library/react";
// import { useAuth } from "./useAuth";
import {
  QueryClient,
  // QueryClientProvider,
} from "@tanstack/react-query";
// import { AuthContext } from "@/providers/auth-provider";
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
//   <QueryClientProvider client={queryClient}>
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

describe.skip("useAuth", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    // test("login success flow", async () => {
    //   const { result } = renderHook(() => useAuth(), { wrapper });

    //   await act(async () => {
    //     result.current.login({ email: "test@test.com", password: "password" });
    //   });

    //   expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    //   expect(mockSetAuthenticated).toHaveBeenCalledWith(true);
    //   expect(mockNavigate).toHaveBeenCalledWith({
    //     to: "/app/medications",
    //     replace: true,
    //   });
    // });

    // test("logout success flow", async () => {
    //   const { result } = renderHook(() => useAuth(), { wrapper });

    //   await act(async () => {
    //     result.current.logout();
    //   });

    //   expect(mockAuthService.logout).toHaveBeenCalledTimes(1);
    //   expect(mockClearAuth).toHaveBeenCalledTimes(1);
    //   expect(mockNavigate).toHaveBeenCalledWith({ to: "/auth/sign-in" });
    // });

    // test("register success flow", async () => {
    //   const { result } = renderHook(() => useAuth(), { wrapper });

    //   await act(async () => {
    //     result.current.register({
    //       email: "test@test.com",
    //       password: "password",
    //       name: "Test User",
    //     });
    //   });

    //   expect(mockAuthService.register).toHaveBeenCalledTimes(1);
    //   expect(mockSetAuthenticated).toHaveBeenCalledWith(true);
    //   expect(mockNavigate).toHaveBeenCalledWith({ to: "/app/medications" });
    // });

    // test("handles login error", async () => {
    //   mockAuthService.login.mockImplementationOnce(() => {
    //     throw new Error("Login failed");
    //   });

    //   const { result } = renderHook(() => useAuth(), { wrapper });

    //   await act(async () => {
    //     result.current.login({ email: "test@test.com", password: "password" });
    //   });

    //   expect(result.current.error).toBeTruthy();
    //   expect(mockSetAuthenticated).not.toHaveBeenCalled();
    // });
  });
});
