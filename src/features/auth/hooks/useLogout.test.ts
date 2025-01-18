// frontend/src/features/auth/hooks/useLogout.test.tsx
import { describe, test, mock, beforeEach } from "bun:test";
// import { renderHook } from "@testing-library/react";
// import { useLogout } from "./useLogout";
// import { PropsWithChildren } from "react";
// import { AuthProvider } from "@/providers/auth-provider";

// Mock useAuth hook
const mockLogout = mock(() => Promise.resolve());

mock("./useAuth", () => ({
  useAuth: () => ({
    logout: mockLogout,
  }),
}));

// // Test wrapper component
// const Wrapper = ({ children }: PropsWithChildren) => (
//   <AuthProvider>{children}</AuthProvider>
// );

beforeEach(() => {
  mockLogout.mockClear();
});
describe.skip("useLogout", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    //   test("useLogout returns logout function", () => {
    //     const { result } = renderHook(() => useLogout(), {
    //       wrapper: Wrapper,
    //     });

    //     expect(typeof result.current.logout).toBe("function");
    //   });

    //   test("calling logout invokes the auth context logout method", async () => {
    //     const { result } = renderHook(() => useLogout(), {
    //       wrapper: Wrapper,
    //     });

    //     await result.current.logout();
    //     expect(mockLogout).toHaveBeenCalled();
    //   });

    //   test("logout function is memoized between renders", () => {
    //     const { result, rerender } = renderHook(() => useLogout(), {
    //       wrapper: Wrapper,
    //     });

    //     const firstLogout = result.current.logout;
    //     rerender();
    //     const secondLogout = result.current.logout;

    //     expect(firstLogout).toBe(secondLogout);
    //   });
  });
});
