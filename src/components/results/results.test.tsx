import { render, screen } from '@testing-library/react';

import { Results } from './results';
import {
  bulbasaurMock,
  pikachuMock,
  pokemonListMock,
} from '../../shared/test/pokemon-mocks';

describe('Results', () => {
  it('renders section title', () => {
    render(<Results pokemons={[]} loading={false} error={null} />);

    expect(
      screen.getByRole('heading', { name: 'Results' })
    ).toBeInTheDocument();
  });

  it('renders loading message while data is loading', () => {
    render(<Results pokemons={[]} loading={true} error={null} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error exists', () => {
    const errorMessage = 'Failed to load pokemons';

    render(<Results pokemons={[]} loading={false} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders empty message when there are no pokemons', () => {
    render(<Results pokemons={[]} loading={false} error={null} />);

    expect(screen.getByText('No pokemons found.')).toBeInTheDocument();
  });

  it('renders pokemon list when data exists', () => {
    render(<Results pokemons={pokemonListMock} loading={false} error={null} />);

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
    render(<Results pokemons={pokemonListMock} loading={true} error={null} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: pikachuMock.name })
    ).not.toBeInTheDocument();
  });

  it('does not render empty message when error exists', () => {
    render(<Results pokemons={[]} loading={false} error="Server error" />);

    expect(screen.getByText('Server error')).toBeInTheDocument();
    expect(screen.queryByText('No pokemons found.')).not.toBeInTheDocument();
  });
});