// frontend/src/components/ErrorComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ErrorComponent } from "./ErrorComponent";

const meta = {
  title: "Components/ErrorComponent",
  component: ErrorComponent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error("Test error"),
  },
};

export const WithCustomMessage: Story = {
  args: {
    error: new Error("Test error"),
    message: "Custom error message for testing",
  },
};
