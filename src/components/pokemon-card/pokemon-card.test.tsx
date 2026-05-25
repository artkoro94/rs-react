import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { PokemonCard } from './pokemon-card';

const pokemonMock = {
  id: 25,
  name: 'pikachu',
  description: 'Electric pokemon',
  image: '/pikachu.png',
};

describe('PokemonCard', () => {
  it('renders pokemon name, description and image', () => {
    renderCard('/');

    expect(
      screen.getByRole('heading', {
        name: /pikachu/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/electric pokemon/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/pikachu.png'
    );
  });

  it('adds default page query param when page does not exist', () => {
    renderCard('/');

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute(
      'href',
      '/pokemon/25?page=1'
    );
  });

  it('keeps existing page query param', () => {
    renderCard('/?page=5');

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute(
      'href',
      '/pokemon/25?page=5'
    );
  });
});

const renderCard = (route: string) => {
  render(
    <MemoryRouter initialEntries={[route]}>
      <PokemonCard pokemon={pokemonMock} />
    </MemoryRouter>
  );
};