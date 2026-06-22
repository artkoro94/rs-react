import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PokemonCard } from './pokemon-card';

const pokemonMock = {
  id: 25,
  name: 'pikachu',
  description: 'Electric pokemon',
  image: '/pikachu.png',
  types: ['electric'],
};

describe('PokemonCard', () => {
  it('renders pokemon name, description and image', () => {
    renderCard();

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
    renderCard();

  const link = screen.getByRole('link');

  expect(link).toHaveAttribute(
    'href',
    '/pokemon/25'
  );
  });

  it('keeps existing page query param', () => {
    renderCard();

  const link = screen.getByRole('link');

  expect(link).toHaveAttribute(
    'href',
    '/pokemon/25'
  );
  });
});

const renderCard = () => {
  render(
      <PokemonCard pokemon={pokemonMock} />
  );
};