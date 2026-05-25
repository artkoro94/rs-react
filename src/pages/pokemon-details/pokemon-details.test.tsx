import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PokemonDetails } from './pokemon-details';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../shared/api/pokemon-api', () => ({
  fetchPokemonById: vi.fn(),
}));

import {
  fetchPokemonById,
  type PokemonCardData,
} from '../../shared/api/pokemon-api';

const mockedFetchPokemonById = vi.mocked(fetchPokemonById);

const pokemonMock: PokemonCardData = {
  id: 25,
  name: 'pikachu',
  description: 'Electric pokemon',
  image: '/pikachu.png',
};

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/25?page=1']}>
        <Routes>
          <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders loading state', () => {
    mockedFetchPokemonById.mockImplementation(
      () => new Promise(() => {})
    );

    renderComponent();

    expect(screen.getByText(/loading details/i)).toBeInTheDocument();
  });

  it('renders pokemon details after successful request', async () => {
    mockedFetchPokemonById.mockResolvedValue(pokemonMock);

    renderComponent();

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

    expect(screen.getByText(/electric pokemon/i)).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/pikachu.png'
    );
  });

  it('renders error message when request fails', async () => {
    mockedFetchPokemonById.mockRejectedValue(new Error('API Error'));

    renderComponent();

    expect(
      await screen.findByText(/could not load pokemon details/i)
    ).toBeInTheDocument();
  });

  it('navigates back when close button clicked', async () => {
    mockedFetchPokemonById.mockResolvedValue(pokemonMock);

    renderComponent();

    const closeButton = await screen.findByRole('button', {
      name: /close/i,
    });

    await userEvent.click(closeButton);

    expect(navigateMock).toHaveBeenCalledWith({
      pathname: '/',
      search: 'page=1',
    });
  });

  it('renders not found message for invalid pokemon id', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/test']}>
        <Routes>
          <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/pokemon was not found/i)
    ).toBeInTheDocument();
  });
});