// src/components/common/pagination.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PaginationComponent } from './pagination';

const meta: Meta<typeof PaginationComponent> = {
  title: 'Components/Common/Pagination',
  component: PaginationComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    onPageChange: {
      description: 'Callback function when page changes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PaginationComponent>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page: number) => console.log(`Page changed to ${page}`),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log(`Page changed to ${page}`),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page: number) => console.log(`Page changed to ${page}`),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log(`Page changed to ${page}`),
  },
};
