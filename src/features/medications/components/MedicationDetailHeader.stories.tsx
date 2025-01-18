// frontend/src/features/medications/components/MedicationDetailHeader.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MedicationDetailHeader } from "./MedicationDetailHeader";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";

// Initialize i18next for Storybook
i18next
  .use(initReactI18next)
  .init({
    lng: "en",
    resources: {
      en: {
        translation: {
          "medication.manufacturedBy": "Manufactured by {{manufacturer}}",
        },
      },
    },
  });

const meta = {
  title: "Features/Medications/MedicationDetailHeader",
  component: MedicationDetailHeader,
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
} satisfies Meta<typeof MedicationDetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    medication: {
      id: "123",
      brandName: "Aspirin",
      genericName: "Acetylsalicylic acid",
      labelerName: "Bayer",
      activeIngredients: [
        {
          name: "Acetylsalicylic acid",
          strength: "325 mg"
        }
      ],
      route: "oral",
      packaging: ["100 tablets per bottle"],
    },
  },
};

export const LongNames: Story = {
  args: {
    medication: {
      id: "456",
      brandName: "Methylprednisolone Acetate Extended-Release",
      genericName: "Methylprednisolone Acetate (Long-Acting Generic Name Example)",
      labelerName: "Johnson & Johnson Pharmaceutical Research & Development, L.L.C.",
      activeIngredients: [
        {
          name: "Methylprednisolone Acetate",
          strength: "40 mg/mL"
        }
      ],
      route: "intramuscular",
      packaging: ["5 mL vial"],
    },
  },
};

export const NoManufacturer: Story = {
  args: {
    medication: {
      id: "789",
      brandName: "Generic Drug",
      genericName: "Active Ingredient",
      labelerName: "",
      activeIngredients: [
        {
          name: "Active Ingredient",
          strength: "50 mg"
        }
      ],
      route: "oral",
      packaging: ["30 capsules per bottle"],
    },
  },
};
