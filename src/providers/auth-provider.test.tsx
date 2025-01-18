// frontend/src/providers/auth-provider.test.tsx
import { expect, test, beforeAll } from "bun:test";
import { render, act, screen } from "@testing-library/react";
import { AuthProvider, useAuthContext, AuthContext } from "./auth-provider";
import { ReactNode } from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { JSDOM } from "jsdom";

// Setup DOM environment
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Setup i18next
beforeAll(async () => {
  await i18next
    .use(initReactI18next)
    .init({
      lng: "en",
      resources: {
        en: {
          translation: {
            "errors.authContextError": "useAuthContext must be used within an AuthProvider",
          },
        },
      },
    });
});

function TestComponent({ testId = "test" }: { testId?: string }) {
  const { isAuthenticated, setAuthenticated, clearAuth } = useAuthContext();

  return (
    <div>
      <div data-testid={`auth-status-${testId}`}>{isAuthenticated.toString()}</div>
      <button
        onClick={() => setAuthenticated(true)}
        data-testid={`login-${testId}`}
      >
        Login
      </button>
      <button
        onClick={() => clearAuth()}
        data-testid={`logout-${testId}`}
      >
        Logout
      </button>
    </div>
  );
}

function renderWithAuthProvider(component: ReactNode) {
  return render(<AuthProvider>{component}</AuthProvider>);
}

test("AuthProvider initializes with isAuthenticated as false", () => {
  const { getByTestId } = renderWithAuthProvider(
    <TestComponent testId="1" />
  );

  expect(getByTestId("auth-status-1").textContent).toBe("false");
});

test("setAuthenticated updates authentication state", async () => {
  const { getByTestId } = renderWithAuthProvider(
    <TestComponent testId="2" />
  );

  const loginButton = getByTestId("login-2");

  await act(async () => {
    loginButton.click();
  });

  expect(getByTestId("auth-status-2").textContent).toBe("true");
});

test("clearAuth resets authentication state", async () => {
  const { getByTestId } = renderWithAuthProvider(
    <TestComponent testId="3" />
  );

  // Login
  await act(async () => {
    getByTestId("login-3").click();
  });
  expect(getByTestId("auth-status-3").textContent).toBe("true");

  // Logout
  await act(async () => {
    getByTestId("logout-3").click();
  });
  expect(getByTestId("auth-status-3").textContent).toBe("false");
});

test("useAuthContext throws error when used outside AuthProvider", () => {
  let error: Error | null = null;

  try {
    render(<TestComponent />);
  } catch (e) {
    error = e as Error;
  }

  expect(error).not.toBe(null);
  expect(error?.message).toBe("useAuthContext must be used within an AuthProvider");
});

test("AuthProvider provides context value to children", () => {
  let contextValue: any = null;

  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );

  expect(contextValue).toBeDefined();
  expect(typeof contextValue.isAuthenticated).toBe("boolean");
  expect(typeof contextValue.setAuthenticated).toBe("function");
  expect(typeof contextValue.clearAuth).toBe("function");
});

test("AuthContext maintains state across multiple components", async () => {
  const { getByTestId } = render(
    <AuthProvider>
      <TestComponent testId="a" />
      <TestComponent testId="b" />
    </AuthProvider>
  );

  // Check initial state
  expect(getByTestId("auth-status-a").textContent).toBe("false");
  expect(getByTestId("auth-status-b").textContent).toBe("false");

  // Login using first component
  await act(async () => {
    getByTestId("login-a").click();
  });

  // Check both components reflect the change
  expect(getByTestId("auth-status-a").textContent).toBe("true");
  expect(getByTestId("auth-status-b").textContent).toBe("true");
});
