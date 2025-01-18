// frontend/src/features/medications/components/AdministrationRoutes.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { AdministrationRoutes } from "./AdministrationRoutes";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

// Configure i18next for Storybook
i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "medications.administrationRoute.title": "Administration Route",
      },
    },
  },
});

const meta = {
  title: "Features/Medications/AdministrationRoutes",
  component: AdministrationRoutes,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18next}>
        <Story />
      </I18nextProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof AdministrationRoutes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Oral: Story = {
  args: {
    route: "Oral",
  },
};

export const Intravenous: Story = {
  args: {
    route: "Intravenous",
  },
};

export const Subcutaneous: Story = {
  args: {
    route: "Subcutaneous",
  },
};

export const LongRouteName: Story = {
  args: {
    route: "Intramuscular injection with long description",
  },
};

export const MultipleWords: Story = {
  args: {
    route: "Oral Sublingual",
  },
};
