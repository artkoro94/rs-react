import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutPage } from '../../legacy-pages/about-page/about-page';

describe('AboutPage', () => {
  it('renders about page content', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/This app was created by @artkoro94 as part of the RS School React course/i)).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /rs school react course/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /back to app/i,
      })
    ).toBeInTheDocument();
  });
});