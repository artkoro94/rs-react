import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  ThemeContext,
  type Theme,
} from '../theme-context-value';

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'pokemon-theme';

export const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem(
      THEME_STORAGE_KEY
    );

    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme: Theme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    );
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};