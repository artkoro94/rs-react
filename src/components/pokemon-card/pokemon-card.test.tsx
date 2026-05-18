import { screen } from '@testing-library/react';

import { PokemonCard } from './pokemon-card';
import { pikachuMock } from '../../shared/test/pokemon-mocks';
import { renderWithRouter } from '../../shared/test/render-with-router';

describe('PokemonCard', () => {
  it('renders pokemon name and description', () => {
    renderWithRouter(<PokemonCard pokemon={pikachuMock} />);

    expect(
      screen.getByRole('heading', { name: pikachuMock.name })
    ).toBeInTheDocument();

    expect(screen.getByText(pikachuMock.description)).toBeInTheDocument();
  });
});