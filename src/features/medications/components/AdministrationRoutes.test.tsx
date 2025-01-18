// src/features/medications/components/AdministrationRoutes.test.tsx
import { expect, test, beforeAll } from "bun:test";
import { render } from "@testing-library/react";
import { AdministrationRoutes } from "./AdministrationRoutes";
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
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: {
          translation: {
            "medications.administrationRoute.title": "Administration Route",
          },
        },
      },
    });
});

test("renders AdministrationRoutes with correct title", () => {
  const { getByTestId } = render(<AdministrationRoutes route="Oral" />);
  const titleElement = getByTestId("administration-route-title");
  expect(titleElement.textContent).toBe("Administration Route");
});

test("displays the provided route in a badge", () => {
  const testRoute = "Intravenous";
  const { getByText } = render(<AdministrationRoutes route={testRoute} />);
  const badge = getByText(testRoute);
  expect(badge).toBeTruthy();
  expect(badge.textContent).toBe(testRoute);
});

test("renders within a card component", () => {
  const { container } = render(<AdministrationRoutes route="Oral" />);
  const card = container.querySelector('[data-testid="administration-route-card"]');
  expect(card).toBeTruthy();
});

test("applies correct styling classes", () => {
  const { container } = render(<AdministrationRoutes route="Oral" />);
  const flexContainer = container.querySelector("div.flex.flex-wrap.gap-2");
  expect(flexContainer).toBeTruthy();
});
