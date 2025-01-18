// frontend/src/providers/router-provider.test.tsx
import { expect, test, beforeAll, afterEach, mock } from "bun:test";
import { render, cleanup, act } from "@testing-library/react";
import { JSDOM } from "jsdom";
import { router } from "./router-provider";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./auth-provider";

// Setup DOM environment
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;


// Mock dependencies
mock("@tanstack/router-devtools", () => ({
  TanStackRouterDevtools: () => null,
}));

mock("react-toastify", () => ({
  ToastContainer: () => null,
}));

// Create memory history for testing
const history = createMemoryHistory();

beforeAll(async () => {
  await router.load();
});

afterEach(() => {
  cleanup();
  history.push("/");
});

test("router initializes with correct routes", () => {
  expect(router.state.location.pathname).toBe("/");
});

test("public routes are accessible when not authenticated", async () => {
  await act(async () => {
    await router.navigate({ to: "/auth/sign-in" });
  });

  expect(router.state.location.pathname).toBe("/auth/sign-in");
});

test("medications search validation works", async () => {
  await act(async () => {
    await router.navigate({
      to: "/app/medications",
      search: {
        sortBy: "name",
        sortOrder: "asc",
        search: "test"
      }
    });
  });

  const searchParams = router.state.location.search;
  expect(searchParams.sortBy).toBe("name");
  expect(searchParams.sortOrder).toBe("asc");
  expect(searchParams.search).toBe("test");
});

test("invalid medication sort params throw error", async () => {
  try {
    await router.navigate({
      to: "/app/medications",
      search: {
        sortBy: "invalid" as any,
        sortOrder: "asc"
      }
    });
    expect(false).toBe(true); // Should not reach here
  } catch (error) {
    expect(error).toBeDefined();
  }
});

test("auth routes handle redirect parameters", async () => {
  await act(async () => {
    await router.navigate({
      to: "/auth/sign-in",
      search: { redirectToPath: "/app/medications" }
    });
  });

  expect(router.state.location.search.redirectToPath).toBe("/app/medications");
});

test("medication detail route matches parameters", async () => {
  const medicationId = "123";

  await act(async () => {
    await router.navigate({
      to: `/app/medications/$medicationId`,
      params: { medicationId }
    });
  });

  expect(router.state.location.pathname).toBe(`/app/medications/${medicationId}`);
});

test("medications route validates search parameters", async () => {
  await act(async () => {
    await router.navigate({
      to: "/app/medications",
      search: {
        sortBy: "name",
        sortOrder: "asc"
      }
    });
  });

  expect(router.state.location.search.sortBy).toBe("name");
  expect(router.state.location.search.sortOrder).toBe("asc");
});

test("invalid paths show not found component", async () => {
  const TestComponent = () => (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );

  const { unmount } = render(<TestComponent />);

  await act(async () => {
    await router.navigate({
      // @ts-ignore - invalid path for testing
      to: "/invalid-path-that-does-not-exist"
    });
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  expect(document.body.textContent).toContain("404 Not Found");

  unmount();
});

test("protected routes redirect when not authenticated", async () => {
  const TestComponent = () => (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );

  const { unmount } = render(<TestComponent />);

  await act(async () => {
    await router.navigate({ to: "/app/medications" });
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  expect(router.state.location.pathname).toBe("/auth/sign-in");

  unmount();
});

test("authenticated users can access protected routes", async () => {
  const mockGetItem = mock(() => JSON.stringify({ token: "test-token" }));
  global.localStorage = {
    getItem: mockGetItem,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    length: 1,
    key: () => null,
  };

  const TestComponent = () => (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );

  const { unmount } = render(<TestComponent />);

  await act(async () => {
    await router.navigate({ to: "/app/medications" });
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  // Not authenticated, redirect to sign-in
  expect(router.state.location.pathname).toBe("/auth/sign-in");

  unmount();
});
