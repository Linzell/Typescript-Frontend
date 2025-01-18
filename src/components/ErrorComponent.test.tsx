// frontend/src/components/ErrorComponent.test.tsx
import { expect, test, mock, beforeAll } from "bun:test";
import { render } from "@testing-library/react";
import { ErrorComponent } from "./ErrorComponent";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { JSDOM } from "jsdom";

// Setup JSDOM
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
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: {
          translation: {
            "errorComponent.title": "An error occurred",
            "errorComponent.message": "We encountered an unexpected error.",
            "errorComponent.message2": "Please contact us at",
            "errorComponent.message3": "support",
          },
        },
      },
    });
});

// Mock Sentry
mock("@sentry/react", () => ({
  captureException: () => { },
  flush: () => Promise.resolve(true),
}));

test("ErrorComponent renders with default error message", () => {
  const error = new Error("Test error");
  const { container } = render(<ErrorComponent error={error} />);

  const titleElement = container.querySelector("h1");
  expect(titleElement?.textContent).toBe("An error occurred");

  const messageElements = container.querySelectorAll("p");
  expect(messageElements[0].textContent).toBe("We encountered an unexpected error.");
});

test("ErrorComponent renders with custom message", () => {
  const error = new Error("Test error");
  const customMessage = "Custom error message";
  const { container } = render(<ErrorComponent error={error} message={customMessage} />);

  const titleElement = container.querySelector("h1");
  expect(titleElement?.textContent).toBe(customMessage);
});

test("ErrorComponent includes support email link", () => {
  const error = new Error("Test error");
  const { container } = render(<ErrorComponent error={error} />);

  const emailLink = container.querySelector("a");
  expect(emailLink?.getAttribute("href")).toBe("mailto:linzellart@gmail.com");
  expect(emailLink?.textContent).toBe("support");
});
