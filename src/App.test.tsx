import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { fetchPokemons } from './shared/api/pokemon-api';
import { SEARCH_STORAGE_KEY } from './shared/constants/storage';
import {
  bulbasaurMock,
  pikachuMock,
  pokemonListMock,
} from './shared/test/pokemon-mocks';
import { renderWithRouter } from './shared/test/render-with-router';

vi.mock('./shared/api/pokemon-api', () => ({
  fetchPokemons: vi.fn(),
}));

const mockedFetchPokemons = vi.mocked(fetchPokemons);

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedFetchPokemons.mockReset();
  });

  it('loads pokemons on initial render with empty search term', async () => {
    mockedFetchPokemons.mockResolvedValueOnce(pokemonListMock);

    renderWithRouter(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenCalledWith('', 0);
    });

    expect(
      await screen.findByRole('heading', { name: pikachuMock.name })
    ).toBeInTheDocument();

    expect(screen.getByText(pikachuMock.description)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: bulbasaurMock.name })
    ).toBeInTheDocument();

    expect(screen.getByText(bulbasaurMock.description)).toBeInTheDocument();
  });

  it('loads pokemons using saved search term from localStorage', async () => {
    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');
    mockedFetchPokemons.mockResolvedValueOnce([pikachuMock]);

    renderWithRouter(<App />);

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenCalledWith('pikachu', 0);
    });

    expect(screen.getByPlaceholderText('pikachu')).toHaveValue('pikachu');

    expect(
      await screen.findByRole('heading', { name: pikachuMock.name })
    ).toBeInTheDocument();
  });

  it('searches pokemons by user input', async () => {
    const user = userEvent.setup();

    mockedFetchPokemons.mockResolvedValue(pokemonListMock);

    renderWithRouter(<App />);

    const input = screen.getByPlaceholderText('pikachu');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.clear(input);
    await user.type(input, 'bulbasaur');
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenCalledWith('bulbasaur', 0);
    });
  });

  it('disables previous button on first page when search mode is disabled', async () => {
    mockedFetchPokemons.mockResolvedValueOnce([pikachuMock]);

    renderWithRouter(<App />);

    await screen.findByRole('heading', { name: pikachuMock.name });

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('renders error message when API request fails', async () => {
    mockedFetchPokemons.mockRejectedValueOnce(new Error('API error'));

    renderWithRouter(<App />);

    expect(
      await screen.findByText('Could not load pokemons. Try another name.')
    ).toBeInTheDocument();

    expect(mockedFetchPokemons).toHaveBeenCalledWith('', 0);
  });
});