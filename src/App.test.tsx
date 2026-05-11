import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { fetchPokemons } from './shared/api/pokemon-api';
import {
  bulbasaurMock,
  pikachuMock,
  pokemonListMock,
} from './shared/test/pokemon-mocks';
import { SEARCH_STORAGE_KEY } from './shared/constants/storage';

vi.mock('./shared/api/pokemon-api', () => ({
  fetchPokemons: vi.fn(),
}));

const mockedFetchPokemons = vi.mocked(fetchPokemons);

describe('App', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  beforeEach(() => {
    localStorage.clear();
    mockedFetchPokemons.mockReset();
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('loads pokemons on initial render with empty search term', async () => {
    mockedFetchPokemons.mockResolvedValueOnce(pokemonListMock);

    render(<App />);

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

    render(<App />);

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

    mockedFetchPokemons
      .mockResolvedValueOnce(pokemonListMock)
      .mockResolvedValueOnce([pikachuMock]);

    render(<App />);

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenCalledWith('', 0);
    });

    const searchInput = screen.getByPlaceholderText('pikachu');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, '  pikachu  ');
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenLastCalledWith('pikachu', 0);
    });

    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('pikachu');

    expect(
      await screen.findByRole('heading', { name: pikachuMock.name })
    ).toBeInTheDocument();
  });

  it('loads next page for current search term', async () => {
    const user = userEvent.setup();

    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');

    mockedFetchPokemons
      .mockResolvedValueOnce([pikachuMock])
      .mockResolvedValueOnce([bulbasaurMock]);

    render(<App />);

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenCalledWith('pikachu', 0);
    });

    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenLastCalledWith('pikachu', 10);
    });

    expect(
      await screen.findByRole('heading', { name: bulbasaurMock.name })
    ).toBeInTheDocument();
  });

  it('loads previous page with zero as minimum offset', async () => {
    const user = userEvent.setup();

    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');

    mockedFetchPokemons
      .mockResolvedValueOnce([pikachuMock])
      .mockResolvedValueOnce([bulbasaurMock])
      .mockResolvedValueOnce([pikachuMock]);

    render(<App />);

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenCalledWith('pikachu', 0);
    });

    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenLastCalledWith('pikachu', 10);
    });

    await user.click(screen.getByRole('button', { name: 'Previous' }));

    await waitFor(() => {
      expect(mockedFetchPokemons).toHaveBeenLastCalledWith('pikachu', 0);
    });
  });

  it('disables previous button on first page', async () => {
    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');
    mockedFetchPokemons.mockResolvedValueOnce([pikachuMock]);

    render(<App />);

    await screen.findByRole('heading', { name: pikachuMock.name });

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('renders error message when API request fails', async () => {
    mockedFetchPokemons.mockRejectedValueOnce(new Error('API error'));

    render(<App />);

    expect(
      await screen.findByText('Could not load pokemons. Try another name.')
    ).toBeInTheDocument();

    expect(mockedFetchPokemons).toHaveBeenCalledWith('', 0);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});