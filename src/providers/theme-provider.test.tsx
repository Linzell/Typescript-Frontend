// frontend/src/providers/theme-provider.test.tsx
import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./theme-provider";
import { renderHook } from "@testing-library/react-hooks";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { JSDOM } from 'jsdom';

// Mock storage
const mockStorage: { [key: string]: string } = {};

// Setup test environment before each test
beforeEach(async () => {
  // Setup DOM
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost', // This prevents the "opaque origin" error
    pretendToBeVisual: true,
  });

  global.document = dom.window.document;
  global.window = dom.window as unknown as Window & typeof globalThis;

  // Mock localStorage
  Object.defineProperty(global.window, 'localStorage', {
    value: {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => { mockStorage[key] = value; },
      clear: () => { Object.keys(mockStorage).forEach(key => delete mockStorage[key]); }
    },
    writable: true
  });

  // Mock matchMedia
  Object.defineProperty(global.window, 'matchMedia', {
    value: (query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      addEventListener: () => { },
      removeEventListener: () => { },
      addListener: () => { },
      removeListener: () => { },
      media: query,
      onchange: null,
      dispatchEvent: () => true,
    }),
    writable: true
  });

  // Setup i18next
  await i18next.use(initReactI18next).init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          "theme.error.useThemeContext": "useTheme must be used within a ThemeProvider"
        }
      }
    }
  });
});

// Cleanup after each test
afterEach(() => {
  document.documentElement.classList.remove('light', 'dark');
});

describe.skip("theme-provider", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    // test("ThemeProvider initializes with default theme", async () => {
    //   await act(async () => {
    //     render(
    //       <ThemeProvider defaultTheme="light">
    //         <div>Test</div>
    //       </ThemeProvider>
    //     );
    //   });

    //   expect(document.documentElement.classList.contains("light")).toBe(true);
    // });

    // test("ThemeProvider uses custom storage key", async () => {
    //   const customKey = "custom-theme-key";

    //   await act(async () => {
    //     render(
    //       <ThemeProvider storageKey={customKey} defaultTheme="dark">
    //         <div>Test</div>
    //       </ThemeProvider>
    //     );
    //   });

    //   expect(document.documentElement.classList.contains("dark")).toBe(true);
    // });

    // test("useTheme hook throws error when used outside provider", () => {
    //   const TestComponent = () => {
    //     expect(() => useTheme()).toThrow("useTheme must be used within a ThemeProvider");
    //     return null;
    //   };

    //   render(<TestComponent />);
    // });

    // test("setTheme updates theme and localStorage", async () => {
    //   const { result } = renderHook(() => useTheme(), {
    //     wrapper: ({ children }) => (
    //       <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    //     ),
    //   });

    //   await act(async () => {
    //     result.current.setTheme("light");
    //   });

    //   expect(result.current.theme).toBe("light");
    //   expect(document.documentElement.classList.contains("light")).toBe(true);
    //   expect(mockStorage["vite-ui-theme"]).toBe("light");
    // });

    // test("system theme respects system preference", async () => {
    //   await act(async () => {
    //     render(
    //       <ThemeProvider defaultTheme="system">
    //         <div>Test</div>
    //       </ThemeProvider>
    //     );
    //   });

    //   expect(document.documentElement.classList.contains("light")).toBe(true);
    // });

    test("theme changes remove previous theme classes", async () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>,
      });

      await act(async () => {
        result.current.setTheme("dark");
      });

      expect(document.documentElement.classList.contains("dark")).toBe(true);

      await act(async () => {
        result.current.setTheme("light");
      });

      expect(document.documentElement.classList.contains("dark")).toBe(false);
      expect(document.documentElement.classList.contains("light")).toBe(true);
    });

    // test("ThemeProvider initializes with stored theme from localStorage", async () => {
    //   mockStorage["vite-ui-theme"] = "dark";

    //   await act(async () => {
    //     render(
    //       <ThemeProvider>
    //         <div>Test</div>
    //       </ThemeProvider>
    //     );
    //   });

    //   expect(document.documentElement.classList.contains("dark")).toBe(true);
    // });
  });
});
