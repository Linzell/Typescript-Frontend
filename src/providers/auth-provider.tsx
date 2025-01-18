// src/providers/auth-provider.tsx
import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Interface defining the shape of authentication context
 */
interface AuthContextType {
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;
  /** Function to set the authenticated state */
  setAuthenticated: (value: boolean) => void;
  /** Function to clear authentication state */
  clearAuth: () => void;
}

/** Context for managing authentication state */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component for authentication context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // You might want to add a basic check here if needed
    return false;
  });

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const clearAuth = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context
 * @throws {Error} If used outside of AuthProvider
 * @returns {AuthContextType} Authentication context value
 */
export const useAuthContext = () => {
  const { t } = useTranslation();

  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(t('errors.authContextError'));
  }
  return context;
};
