import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

export const renderWithRouter = (
  component: ReactElement,
  initialEntries: string[] = ['/?page=1']
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};