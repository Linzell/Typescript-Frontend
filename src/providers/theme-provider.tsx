import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/** Available theme options */
type Theme = "dark" | "light" | "system";

/** Props for ThemeProvider component */
type ThemeProviderProps = {
  /** Child components */
  children: React.ReactNode;
  /** Initial theme setting, defaults to system */
  defaultTheme?: Theme;
  /** Key used for theme storage in localStorage */
  storageKey?: string;
};

/** Theme context state */
type ThemeProviderState = {
  /** Current theme */
  theme: Theme;
  /** Function to update theme */
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Theme provider component that manages theme state and persists it to localStorage
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)")
        .matches
        ? "light"
        : "dark";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Hook to access theme state and setter
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = () => {
  const { t } = useTranslation();
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error(t("theme.error.useThemeContext"));

  return context;
};
