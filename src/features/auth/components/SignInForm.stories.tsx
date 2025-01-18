// frontend/src/features/auth/components/SignInForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SignInForm } from "./SignInForm";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

// Initialize i18next for Storybook
i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "auth.form.emailPlaceholder": "Email",
        "auth.form.emailLabel": "Email",
        "auth.form.passwordPlaceholder": "Password",
        "auth.form.passwordLabel": "Password",
        "auth.form.signIn": "Sign In",
        "auth.form.signingIn": "Signing In...",
        "auth.errors.invalidEmail": "Invalid email",
        "auth.errors.passwordLength": "Password must be at least 6 characters",
        "auth.errors.generic": "An error occurred",
      },
    },
  },
});

const meta = {
  title: "Features/Auth/SignInForm",
  component: SignInForm,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18next}>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    redirectToPath: "/",
  },
};

export const WithError: Story = {
  args: {
    redirectToPath: "/",
  },
  parameters: {
    mockData: {
      useAuth: () => ({
        login: () => { },
        isLoading: false,
        error: new Error("auth.errors.generic"),
      }),
    },
  },
};

export const Loading: Story = {
  args: {
    redirectToPath: "/",
  },
  parameters: {
    mockData: {
      useAuth: () => ({
        login: () => { },
        isLoading: true,
        error: null,
      }),
    },
  },
};
