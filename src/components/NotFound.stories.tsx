// frontend/src/components/NotFound.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { NotFound } from "./NotFound";
import { ThemeProvider } from "@/providers/theme-provider";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";

// Initialize i18next for Storybook
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "notFound.title": "404 Not Found",
        "notFound.description": "Page not found",
        "notFound.goBack": "Go Back",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
});

const meta = {
  title: "Components/NotFound",
  component: NotFound,
  decorators: [
    (Story) => (
      <HelmetProvider>
        <I18nextProvider i18n={i18next}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Story />
          </ThemeProvider>
        </I18nextProvider>
      </HelmetProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  decorators: [
    (Story) => (
      <HelmetProvider>
        <I18nextProvider i18n={i18next}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Story />
          </ThemeProvider>
        </I18nextProvider>
      </HelmetProvider>
    ),
  ],
};
