// frontend/src/features/medications/components/MedicationList.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MedicationList } from "./MedicationList";

// Mock data generator
const generateMockMedications = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `Medication ${i + 1}`,
    route: ["ORAL", "TOPICAL", "INTRAVENOUS"][i % 3],
    activeIngredient: `Ingredient ${i + 1}`,
    description: `Description for medication ${i + 1}`,
    dosageForm: "Tablet",
    strength: "500mg",
  }));

const meta: Meta<typeof MedicationList> = {
  title: "Features/Medications/MedicationList",
  component: MedicationList,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="container mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MedicationList>;

export const Default: Story = {
  args: {}
};

export const Loading: Story = {
  args: {},
  parameters: {
    mockData: {
      useMedications: () => ({
        data: null,
        isLoading: true,
        error: null
      })
    }
  }
};

export const PageError: Story = {
  args: {},
  parameters: {
    mockData: {
      useMedications: () => ({
        data: null,
        isLoading: false,
        error: new Error("Failed to fetch medications")
      })
    }
  }
};

export const Empty: Story = {
  args: {},
  parameters: {
    mockData: {
      useMedications: () => ({
        data: {
          medications: [],
          total: 0
        },
        isLoading: false,
        error: null
      })
    }
  }
};

export const WithManyItems: Story = {
  args: {},
  parameters: {
    mockData: {
      useMedications: () => ({
        data: {
          medications: generateMockMedications(24),
          total: 24
        },
        isLoading: false,
        error: null
      })
    }
  }
};

export const FilteredByRoute: Story = {
  args: {},
  parameters: {
    mockData: {
      useMedications: () => ({
        data: {
          medications: generateMockMedications(6).filter(m => m.route === "ORAL"),
          total: 2
        },
        isLoading: false,
        error: null
      })
    }
  }
};

export const FilteredBySearch: Story = {
  args: {},
  parameters: {
    mockData: {
      useMedications: () => ({
        data: {
          medications: generateMockMedications(6).filter(m =>
            m.name.toLowerCase().includes("medication 1")
          ),
          total: 1
        },
        isLoading: false,
        error: null
      })
    }
  }
};
