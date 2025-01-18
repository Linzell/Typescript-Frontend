// frontend/src/features/medications/components/ActiveIngredientsSection.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ActiveIngredientsSection } from "./ActiveIngredientsSection";

const meta = {
  title: "Features/Medications/ActiveIngredientsSection",
  component: ActiveIngredientsSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveIngredientsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ingredients: [
      { name: "Paracetamol", strength: "500mg" },
      { name: "Caffeine", strength: "65mg" },
    ],
  },
};

export const SingleIngredient: Story = {
  args: {
    ingredients: [
      { name: "Ibuprofen", strength: "400mg" },
    ],
  },
};

export const ManyIngredients: Story = {
  args: {
    ingredients: [
      { name: "Paracetamol", strength: "500mg" },
      { name: "Caffeine", strength: "65mg" },
      { name: "Codeine", strength: "8mg" },
      { name: "Diphenhydramine", strength: "25mg" },
      { name: "Phenylephrine", strength: "5mg" },
    ],
  },
};

export const Empty: Story = {
  args: {
    ingredients: [],
  },
};

export const LongNames: Story = {
  args: {
    ingredients: [
      {
        name: "Methylenedioxymethamphetamine Hydrochloride",
        strength: "150mg/5ml"
      },
      {
        name: "Dextromethorphan Hydrobromide Monohydrate",
        strength: "100mg/2.5ml"
      },
    ],
  },
};
