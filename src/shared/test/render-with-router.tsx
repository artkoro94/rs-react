import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../context/theme-context/theme-context';

export const renderWithRouter = (
  component: ReactElement,
  initialEntries: string[] = ['/?page=1']
) => {
  return render(
  <ThemeProvider>
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  </ThemeProvider>
  );
};