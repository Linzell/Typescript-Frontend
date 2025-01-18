// src/features/medications/components/PackagingSection.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { PackagingSection } from "./PackagingSection";

const meta: Meta<typeof PackagingSection> = {
  title: "Features/Medications/PackagingSection",
  component: PackagingSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PackagingSection>;

export const Default: Story = {
  args: {
    packaging: ["30 tablets", "60 tablets", "90 tablets"],
  },
};

export const SinglePackaging: Story = {
  args: {
    packaging: ["30 tablets"],
  },
};

export const LongPackagingList: Story = {
  args: {
    packaging: [
      "30 tablets in blister pack",
      "60 tablets in bottle",
      "90 tablets in bottle",
      "100 tablets in blister pack",
      "500 tablets in bulk container",
    ],
  },
};

export const EmptyPackagingList: Story = {
  args: {
    packaging: [],
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    packaging: [
      "2 x 30 tablets (60)",
      "3 x 30 tablets (90)",
      "500ml liquid solution",
      "10mg/ml suspension",
    ],
  },
};
