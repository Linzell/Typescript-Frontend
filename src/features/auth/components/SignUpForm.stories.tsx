// frontend/src/features/auth/components/SignUpForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from './SignUpForm';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

// Initialize i18next for Storybook
i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        "auth.signup.namePlaceholder": "Enter your name",
        "auth.signup.emailPlaceholder": "Enter your email",
        "auth.signup.passwordPlaceholder": "Enter your password",
        "auth.signup.confirmPasswordPlaceholder": "Confirm password",
        "auth.signup.nameLabel": "Name",
        "auth.signup.emailLabel": "Email",
        "auth.signup.passwordLabel": "Password",
        "auth.signup.confirmPasswordLabel": "Confirm Password",
        "auth.signup.submit": "Sign Up",
        "auth.signup.loading": "Loading...",
        "auth.signup.genericError": "An error occurred",
      },
    },
  },
});

const meta = {
  title: 'Features/Auth/SignUpForm',
  component: SignUpForm,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18next}>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    mockData: [
      {
        path: '../hooks/useRegister',
        data: {
          isLoading: true,
          error: null,
          register: async () => { },
        },
      },
    ],
  },
};

export const WithError: Story = {
  parameters: {
    mockData: [
      {
        path: '../hooks/useRegister',
        data: {
          isLoading: false,
          error: new Error('Invalid credentials'),
          register: async () => { },
        },
      },
    ],
  },
};
