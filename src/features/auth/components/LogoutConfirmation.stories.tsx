// frontend/src/features/auth/components/LogoutConfirmation.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LogoutConfirmation } from './LogoutConfirmation';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

// Initialize i18next for Storybook
i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'auth.logout.confirmTitle': 'Confirm Logout',
        'auth.logout.confirmMessage': 'Are you sure you want to logout?',
        'common.cancel': 'Cancel',
        'auth.logout.loggingOut': 'Logging out...',
        'auth.logout.confirm': 'Logout'
      }
    }
  }
});

const meta = {
  title: 'Auth/LogoutConfirmation',
  component: LogoutConfirmation,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18next}>
        <Story />
      </I18nextProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoutConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onConfirm: () => alert('Confirmed logout'),
    onCancel: () => alert('Cancelled logout'),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
    onConfirm: () => { },
    onCancel: () => { },
    isLoading: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onConfirm: () => { },
    onCancel: () => { },
    isLoading: false,
  },
};
