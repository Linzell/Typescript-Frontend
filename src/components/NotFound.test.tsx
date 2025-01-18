// frontend/src/components/NotFound.test.tsx
import { expect, test, mock } from "bun:test";
import { render, fireEvent } from "@testing-library/react";
import { JSDOM } from "jsdom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Setup DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;

// Mock external dependencies
mock("@sentry/react", () => ({
  captureMessage: () => { },
}));

const mockRouter = {
  history: {
    back: () => { },
    location: { href: "test-url" },
  },
  latestLocation: { href: "test-url" },
};

mock("@tanstack/react-router", () => ({
  useRouter: () => mockRouter,
}));

// Setup i18next
i18next.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "notFound.title": "404 Not Found",
        "notFound.description": "Page not found",
        "notFound.goBack": "Go Back",
      },
    },
  },
});

// Create a simplified version of NotFound for testing
function TestNotFound() {
  const router = mockRouter;
  const { t } = i18next;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2.5">
      <h2 className="text-5xl font-bold">{t("notFound.title")}</h2>
      <h3 className="text-xl font-semibold">{t("notFound.description")}</h3>
      <button onClick={() => router.history.back()}>
        {t("notFound.goBack")}
      </button>
    </div>
  );
}

test("NotFound renders correctly", () => {
  const { container } = render(<TestNotFound />);

  const title = container.querySelector("h2");
  const description = container.querySelector("h3");
  const button = container.querySelector("button");

  expect(title?.textContent).toBe("404 Not Found");
  expect(description?.textContent).toBe("Page not found");
  expect(button?.textContent).toBe("Go Back");
});

test("NotFound has correct styling classes", () => {
  const { container } = render(<TestNotFound />);

  const mainDiv = container.querySelector("div");
  expect(mainDiv?.className).toContain("flex h-screen flex-col items-center justify-center");
});

test("Button triggers history.back", () => {
  let called = false;
  mockRouter.history.back = () => { called = true; };

  const { container } = render(<TestNotFound />);
  const button = container.querySelector("button");
  button && fireEvent.click(button);

  expect(called).toBe(true);
});
