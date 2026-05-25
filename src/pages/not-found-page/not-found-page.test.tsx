import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  it('renders not found page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/page was not found/i)).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /back to app/i,
      })
    ).toBeInTheDocument();
  });
});