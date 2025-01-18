// frontend/src/features/medications/components/MedicationCard.test.tsx
import { expect, test, mock } from "bun:test";
import { render, fireEvent } from "@testing-library/react";
import { MedicationCard } from "./MedicationCard";
import { Medication } from "@/services/medication.service";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Setup i18next
i18next.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "medication.manufacturer": "Manufacturer",
      },
    },
  },
});

const mockMedication: Medication = {
  id: "123",
  brandName: "Advil",
  genericName: "Ibuprofen",
  labelerName: "Pfizer",
  route: "ORAL",
  activeIngredients: [
    { name: "Ibuprofen", strength: "200mg" },
    { name: "Caffeine", strength: "50mg" },
  ],
  packaging: ["Bottle", "Blister Pack"],
};

test("renders medication information correctly", () => {
  const { getByText } = render(<MedicationCard medication={mockMedication} />);

  expect(getByText("Advil")).toBeDefined();
  expect(getByText("Ibuprofen")).toBeDefined();
  expect(getByText(/Pfizer/)).toBeDefined();
  expect(getByText("ORAL")).toBeDefined();
});

test("displays all active ingredients", () => {
  const { getAllByRole } = render(<MedicationCard medication={mockMedication} />);

  // Find all elements with role="badge" (you might need to add this role to your Badge component)
  const ingredients = getAllByRole('status');
  expect(ingredients.length).toBeGreaterThanOrEqual(2);

  const ingredientText = ingredients.map(el => el.textContent).join(' ');
  expect(ingredientText).toContain("Ibuprofen (200mg)");
  expect(ingredientText).toContain("Caffeine (50mg)");
});

test("calls onClick handler when clicked", () => {
  let clicked = false;
  const handleClick = () => {
    clicked = true;
  };

  const { container } = render(
    <MedicationCard medication={mockMedication} onClick={handleClick} />
  );

  // Find the Card component by its className from shadcn/ui
  const card = container.firstElementChild;
  card && fireEvent.click(card);
  expect(clicked).toBe(true);
});

test("applies hover styles", () => {
  const { container } = render(<MedicationCard medication={mockMedication} />);
  const card = container.firstElementChild;

  // Check if the classes from the component are present
  const cardClassNames = card?.className || "";
  expect(cardClassNames.includes("cursor-pointer")).toBe(true);
  expect(cardClassNames.includes("hover:shadow-lg")).toBe(true);
});
