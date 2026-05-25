import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from './theme-context';
import { useTheme } from '../../context/use-theme';
import { beforeEach } from 'vitest';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <p>{theme}</p>

      <button
        type="button"
        onClick={toggleTheme}
      >
        toggle
      </button>
    </>
  );
};

beforeEach(() => {
  window.localStorage.clear();

  document.documentElement.removeAttribute('data-theme');
});

describe('theme context', () => {
  it('toggles theme', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('adds theme attribute to document', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(
      document.documentElement.getAttribute('data-theme')
    ).toBe('light');
  });
});