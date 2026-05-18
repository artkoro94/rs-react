import { screen } from '@testing-library/react';

import { PokemonList } from './pokemon-list';
import {
  bulbasaurMock,
  pikachuMock,
  pokemonListMock,
} from '../../shared/test/pokemon-mocks'
import { renderWithRouter } from '../../shared/test/render-with-router';;

describe('PokemonList', () => {
  it('renders pokemon cards from the list', () => {
    renderWithRouter(<PokemonList pokemons={pokemonListMock} />);

    expect(
      screen.getByRole('heading', { name: pikachuMock.name })
    ).toBeInTheDocument();

    expect(screen.getByText(pikachuMock.description)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: bulbasaurMock.name })
    ).toBeInTheDocument();

    expect(screen.getByText(bulbasaurMock.description)).toBeInTheDocument();
  });

  it('renders no pokemon cards when list is empty', () => {
    renderWithRouter(<PokemonList pokemons={[]} />);

    expect(screen.queryByRole('heading', { name: pikachuMock.name })).not.toBeInTheDocument();
  });
});