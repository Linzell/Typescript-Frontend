// frontend/src/features/medications/components/MedicationDetailHeader.test.tsx
import { expect, test, beforeAll } from "bun:test";
import { render } from "@testing-library/react";
import { MedicationDetailHeader } from "./MedicationDetailHeader";
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
            "medication.manufacturedBy": "Manufactured by {{manufacturer}}",
          },
        },
      },
    });
});

const mockMedication = {
  id: "123",
  brandName: "Aspirin",
  genericName: "Acetylsalicylic acid",
  labelerName: "Bayer",
  activeIngredients: [
    {
      name: "Acetylsalicylic acid",
      strength: "325mg"
    }
  ],
  route: "oral",
  packaging: ["100 tablets per bottle"],
};

test("renders medication brand name as heading", () => {
  const { container } = render(
    <MedicationDetailHeader medication={mockMedication} />
  );

  const heading = container.querySelector("h1");
  expect(heading?.textContent).toBe("Aspirin");
});

test("renders generic name", () => {
  const { container } = render(
    <MedicationDetailHeader medication={mockMedication} />
  );

  const genericName = container.querySelector("p");
  expect(genericName?.textContent).toBe("Acetylsalicylic acid");
});

test("renders manufacturer information with translation", () => {
  const { container } = render(
    <MedicationDetailHeader medication={mockMedication} />
  );

  const manufacturerInfo = container.querySelectorAll("p")[1];
  expect(manufacturerInfo?.textContent).toBe("Manufactured by Bayer");
});

test("applies correct CSS classes", () => {
  const { container } = render(
    <MedicationDetailHeader medication={mockMedication} />
  );

  const mainDiv = container.firstChild;
  expect(mainDiv?.className).toContain("space-y-4");

  const heading = container.querySelector("h1");
  expect(heading?.className).toContain("text-3xl font-bold");

  const genericName = container.querySelector("p");
  expect(genericName?.className).toContain("text-xl text-gray-600");
});
