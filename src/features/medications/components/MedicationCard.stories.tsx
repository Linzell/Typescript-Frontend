// src/features/medications/components/MedicationCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MedicationCard } from "./MedicationCard";
import { Medication } from "@/services/medication.service";

const meta: Meta<typeof MedicationCard> = {
  title: "Features/Medications/MedicationCard",
  component: MedicationCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MedicationCard>;

const defaultMedication: Medication = {
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

export const Default: Story = {
  args: {
    medication: defaultMedication,
  },
};

export const LongNames: Story = {
  args: {
    medication: {
      ...defaultMedication,
      brandName: "Methylprednisolone Acetate Extended Release",
      genericName: "Methylprednisolone Acetate (Very Long Generic Name)",
      labelerName: "Very Long Pharmaceutical Company Name Inc.",
    },
  },
};

export const MultipleIngredients: Story = {
  args: {
    medication: {
      ...defaultMedication,
      activeIngredients: [
        { name: "Ingredient 1", strength: "100mg" },
        { name: "Ingredient 2", strength: "200mg" },
        { name: "Ingredient 3", strength: "300mg" },
        { name: "Ingredient 4", strength: "400mg" },
      ],
    },
  },
};

export const WithClickHandler: Story = {
  args: {
    medication: defaultMedication,
    onClick: (medication) => alert(`Clicked on ${medication.brandName}`),
  },
};

export const DifferentRoute: Story = {
  args: {
    medication: {
      ...defaultMedication,
      route: "INTRAVENOUS",
    },
  },
};
