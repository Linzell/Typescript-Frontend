import type { Preview } from "@storybook/react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18next for Storybook
void i18next.use(initReactI18next).init({
  lng: "en",
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

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
