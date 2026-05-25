import { useTheme } from '../../context/theme-context';

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