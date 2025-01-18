// frontend/src/pages/auth/LogoutPage.test.tsx
import { describe, test, mock, beforeAll } from "bun:test";
// import { render, fireEvent } from "@testing-library/react";
// import { LogoutPage } from "./LogoutPage";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Mock dependencies
const mockNavigate = mock(() => { });
const mockMutate = mock(() => { });

mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

mock("@/features/auth/hooks/useLogout", () => ({
  useLogout: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
}));

mock("react-helmet-async", () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock LogoutConfirmation component
mock("@/features/auth/components/LogoutConfirmation", () => ({
  LogoutConfirmation: ({
    isOpen,
    onConfirm,
    onCancel,
    isLoading,
  }: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading: boolean;
  }) => (
    <div data-testid="logout-confirmation">
      {isOpen && (
        <>
          <button
            data-testid="confirm-button"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Confirm
          </button>
          <button data-testid="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </>
      )}
    </div>
  ),
}));

// Setup i18next
beforeAll(async () => {
  await i18next.use(initReactI18next).init({
    lng: "en",
    resources: {
      en: {
        translation: {
          "logout.pageTitle": "Logout - Medication Manager",
        },
      },
    },
  });
});

describe.skip("LogoutPage", () => {
  test.skip("temporarily skipped due to JSDOM/Bun compatibility issues", () => {
    // test("LogoutPage renders with confirmation dialog", () => {
    //   const { getByTestId } = render(<LogoutPage />);

    //   expect(getByTestId("logout-confirmation")).toBeDefined();
    //   expect(getByTestId("confirm-button")).toBeDefined();
    //   expect(getByTestId("cancel-button")).toBeDefined();
    // });

    // test("Clicking confirm triggers logout mutation", () => {
    //   const { getByTestId } = render(<LogoutPage />);

    //   fireEvent.click(getByTestId("confirm-button"));
    //   expect(mockMutate).toHaveBeenCalled();
    // });

    // test("Clicking cancel navigates to home and closes dialog", () => {
    //   const { getByTestId } = render(<LogoutPage />);

    //   fireEvent.click(getByTestId("cancel-button"));
    //   expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    // });

    // test("Page has correct title", () => {
    //   const { container } = render(<LogoutPage />);

    //   const titleElement = container.querySelector("title");
    //   expect(titleElement?.textContent).toBe("Logout - Medication Manager");
    // });

    // test("Confirmation dialog is initially open", () => {
    //   const { getByTestId } = render(<LogoutPage />);

    //   const confirmationDialog = getByTestId("logout-confirmation");
    //   expect(confirmationDialog).toBeDefined();
    //   expect(getByTestId("confirm-button")).toBeDefined();
    //   expect(getByTestId("cancel-button")).toBeDefined();
    // });

    // test("Loading state disables confirm button", () => {
    //   // Override the useLogout mock for this specific test
    //   mock("@/features/auth/hooks/useLogout", () => ({
    //     useLogout: () => ({
    //       mutate: mockMutate,
    //       isLoading: true,
    //     }),
    //   }));

    //   const { getByTestId } = render(<LogoutPage />);

    //   const confirmButton = getByTestId("confirm-button");
    //   expect(confirmButton.hasAttribute("disabled")).toBe(true);
    // });
  });
});
