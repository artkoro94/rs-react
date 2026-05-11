import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from './search';
import { SEARCH_STORAGE_KEY } from '../../shared/constants/storage';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and search button', () => {
    render(<Search onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('pikachu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('shows empty input when localStorage is empty', () => {
    render(<Search onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('pikachu')).toHaveValue('');
  });

  it('shows saved search term from localStorage on initial render', () => {
    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');

    render(<Search onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('pikachu')).toHaveValue('pikachu');
  });

  it('calls onSearch with saved search term on mount', () => {
    const onSearch = vi.fn();

    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');

    render(<Search onSearch={onSearch} />);

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    render(<Search onSearch={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText('pikachu');

    await user.type(searchInput, 'bulbasaur');

    expect(searchInput).toHaveValue('bulbasaur');
  });

  it('trims search term, saves it to localStorage and calls onSearch on submit', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const searchInput = screen.getByPlaceholderText('pikachu');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, '  charmander  ');
    await user.click(searchButton);

    await waitFor(() => {
      expect(onSearch).toHaveBeenLastCalledWith('charmander');
    });

    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('charmander');
    expect(searchInput).toHaveValue('charmander');
  });

  it('overwrites previous localStorage value after new search', async () => {
    const user = userEvent.setup();

    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');

    render(<Search onSearch={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText('pikachu');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.clear(searchInput);
    await user.type(searchInput, 'squirtle');
    await user.click(searchButton);

    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('squirtle');
  });

  it('does not call onSearch again when submitted search term has not changed', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    localStorage.setItem(SEARCH_STORAGE_KEY, 'pikachu');

    render(<Search onSearch={onSearch} />);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(onSearch).toHaveBeenCalledTimes(1);

    await user.click(searchButton);

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('submits search when user presses Enter', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const searchInput = screen.getByPlaceholderText('pikachu');

    await user.type(searchInput, 'eevee{Enter}');

    await waitFor(() => {
      expect(onSearch).toHaveBeenLastCalledWith('eevee');
    });

    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('eevee');
  });
});