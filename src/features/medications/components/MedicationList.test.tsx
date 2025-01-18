// frontend/src/features/medications/components/MedicationList.test.tsx
import { describe, test, mock, beforeAll } from "bun:test";
// import { render, screen } from "@testing-library/react";
// import { MedicationList } from "./MedicationList";
import { JSDOM } from "jsdom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import userEvent from "@testing-library/user-event";

// Setup DOM environment
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock dependencies
const mockNavigate = mock(() => { });
mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock the custom hooks
// mock("../hooks/useMedications", () => ({
//   useMedications: mock(({ page, search, route, activeIngredient }) => ({
//     data: {
//       medications: [
//         {
//           id: "1",
//           name: "Test Medication",
//           route: "ORAL",
//           activeIngredient: "Test Ingredient",
//         },
//       ],
//       total: 1,
//     },
//     isLoading: false,
//     error: null,
//   })),
// }));

// Setup i18next
beforeAll(async () => {
  await i18next.use(initReactI18next).init({
    lng: "en",
    resources: {
      en: {
        translation: {
          "medications.routes.all": "All Routes",
          "medications.routes.oral": "Oral",
          "medications.search.placeholder": "Search medications...",
          "medications.activeIngredient.placeholder": "Search by active ingredient...",
        },
      },
    },
  });
});

describe.skip("MedicationList", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    // test("renders MedicationList component", () => {
    //   const { container } = render(<MedicationList />);
    //   expect(container.querySelector("input")).toBeTruthy();
    //   expect(container.querySelector("[role='combobox']")).toBeTruthy();
    // });

    // test("handles search input change", async () => {
    //   const { container } = render(<MedicationList />);
    //   const searchInput = container.querySelector("input");

    //   await userEvent.type(searchInput!, "test");
    //   expect(searchInput?.value).toBe("test");
    // });

    // test("handles route selection change", async () => {
    //   const { container } = render(<MedicationList />);
    //   const routeSelect = container.querySelector("[role='combobox']");

    //   await userEvent.click(routeSelect!);
    //   const oralOption = screen.getByText("Oral");
    //   await userEvent.click(oralOption);

    //   expect(routeSelect?.textContent).toContain("Oral");
    // });

    // test("displays loading state", () => {
    //   mock("../hooks/useMedications", () => ({
    //     useMedications: () => ({
    //       isLoading: true,
    //       data: null,
    //       error: null,
    //     }),
    //   }));

    //   const { container } = render(<MedicationList />);
    //   expect(container.querySelector(".animate-spin")).toBeTruthy();
    // });

    // test("displays error state", () => {
    //   mock("../hooks/useMedications", () => ({
    //     useMedications: () => ({
    //       isLoading: false,
    //       data: null,
    //       error: new Error("Test error"),
    //     }),
    //   }));

    //   const { container } = render(<MedicationList />);
    //   expect(container.querySelector(".text-red-500")).toBeTruthy();
    // });

    // test("navigates to medication details on card click", async () => {
    //   const { container } = render(<MedicationList />);
    //   const medicationCard = container.querySelector(".medication-card");

    //   await userEvent.click(medicationCard!);
    //   expect(mockNavigate).toHaveBeenCalled();
    // });
  });
});
