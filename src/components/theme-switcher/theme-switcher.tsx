import { useTheme } from '../../context/use-theme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
    >
      Theme:
      {' '}
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
};