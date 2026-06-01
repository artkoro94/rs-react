import { screen } from '@testing-library/react';

import { Results } from './results';
import {
  bulbasaurMock,
  pikachuMock,
  pokemonListMock,
} from '../../shared/test/pokemon-mocks';
import { renderWithRouter } from '../../shared/test/render-with-router';

describe('Results', () => {
  it('renders section title', () => {
    renderWithRouter(<Results pokemons={[]} loading={false} error={null} />);

    expect(
      screen.getByRole('heading', { name: 'Results' })
    ).toBeInTheDocument();
  });

  it('renders loading message while data is loading', () => {
    renderWithRouter(<Results pokemons={[]} loading={true} error={null} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error exists', () => {
    const errorMessage = new Error('Failed to load pokemons');

    renderWithRouter(<Results pokemons={[]} loading={false} error={errorMessage} />);

    expect(screen.getByText('Could not load pokemons. Try another name.')).toBeInTheDocument();
  });

  it('renders empty message when there are no pokemons', () => {
    renderWithRouter(<Results pokemons={[]} loading={false} error={null} />);

    expect(screen.getByText('No pokemons found.')).toBeInTheDocument();
  });

  it('renders pokemon list when data exists', () => {
    renderWithRouter(<Results pokemons={pokemonListMock} loading={false} error={null} />);

    expect(
      screen.getByRole('heading', { name: pikachuMock.name })
    ).toBeInTheDocument();

    expect(screen.getByText(pikachuMock.description)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: bulbasaurMock.name })
    ).toBeInTheDocument();

    expect(screen.getByText(bulbasaurMock.description)).toBeInTheDocument();
  });

  it('does not render pokemon list while loading', () => {
    renderWithRouter(<Results pokemons={pokemonListMock} loading={true} error={null} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: pikachuMock.name })
    ).not.toBeInTheDocument();
  });

it('does not render empty message when error exists', () => {
  renderWithRouter(
    <Results
      pokemons={[]}
      loading={false}
      error={new Error('Server error')}
    />
  );

  expect(
    screen.getByText('Could not load pokemons. Try another name.')
  ).toBeInTheDocument();

  expect(
    screen.queryByText('No pokemons found.')
  ).not.toBeInTheDocument();
});
  });