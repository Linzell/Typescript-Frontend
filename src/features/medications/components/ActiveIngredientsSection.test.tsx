// src/features/medications/components/ActiveIngredientsSection.test.tsx
import { expect, test, beforeAll } from "bun:test";
import { render } from "@testing-library/react";
import { ActiveIngredientsSection } from "./ActiveIngredientsSection";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Setup i18next for testing
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
            "medications.activeIngredients.title": "Active Ingredients",
            "medications.activeIngredients.nameColumn": "Name",
            "medications.activeIngredients.strengthColumn": "Strength",
          },
        },
      },
    });
});

const mockIngredients = [
  { name: "Paracetamol", strength: "500mg" },
  { name: "Caffeine", strength: "65mg" },
];

test("renders the active ingredients section with correct title", () => {
  const { getByTestId } = render(
    <ActiveIngredientsSection ingredients={mockIngredients} />
  );

  const title = getByTestId("active-ingredients-title");
  expect(title.textContent).toBe("Active Ingredients");
});

test("displays correct column headers", () => {
  const { container } = render(
    <ActiveIngredientsSection ingredients={mockIngredients} />
  );

  // Use querySelector to get just the first instance of each header
  const nameHeader = container.querySelector('[data-testid="name-column-header"]');
  const strengthHeader = container.querySelector('[data-testid="strength-column-header"]');

  expect(nameHeader?.textContent).toBe("Name");
  expect(strengthHeader?.textContent).toBe("Strength");
});

test("renders all ingredients with correct data", () => {
  const { container } = render(
    <ActiveIngredientsSection ingredients={mockIngredients} />
  );

  const rows = container.querySelectorAll("tbody tr");

  mockIngredients.forEach((ingredient, index) => {
    const cells = rows[index]?.querySelectorAll("td");
    expect(cells?.[0]?.textContent).toBe(ingredient.name);
    expect(cells?.[1]?.textContent).toBe(ingredient.strength);
  });
});

test("handles empty ingredients array", () => {
  const { container } = render(<ActiveIngredientsSection ingredients={[]} />);
  const rows = container.querySelectorAll("tbody tr");
  expect(rows.length).toBe(0);
});
