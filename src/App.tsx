import React from 'react';
import { ErrorBoundary } from './components/error-boundary';
import { ErrorButton } from './components/error-button';
import { Header } from './components/header';
import { Results } from './components/results';
import { Search } from './components/search';
import { fetchPokemons, type PokemonCardData } from './shared/api/pokemon-api';

interface AppState {
  pokemons: PokemonCardData[];
  loading: boolean;
  error: string | null;
  offset: number;
  searchTerm: string;
}

const PAGE_OFFSET_STEP = 10;

class App extends React.Component<object, AppState> {
  state: AppState = {
    pokemons: [],
    loading: false,
    error: null,
    offset: 0,
    searchTerm: '',
  };

  loadPokemons = async (searchTerm: string, offset: number): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const pokemons = await fetchPokemons(searchTerm, offset);

      this.setState({
        pokemons,
        loading: false,
        error: null,
        offset,
        searchTerm,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        pokemons: [],
        loading: false,
        error: 'Could not load pokemons. Try another name.',
      });
    }
  };

  handleSearch = (searchTerm: string): void => {
    this.loadPokemons(searchTerm, 0);
  };

  handleNextPage = (): void => {
    const nextOffset = this.state.offset + PAGE_OFFSET_STEP;

    this.loadPokemons(this.state.searchTerm, nextOffset);
  };

  handlePreviousPage = (): void => {
    const previousOffset = Math.max(this.state.offset - PAGE_OFFSET_STEP, 0);

    this.loadPokemons(this.state.searchTerm, previousOffset);
  };

  render() {
    const { pokemons, loading, error, offset, searchTerm } = this.state;
    const isSearchMode = Boolean(searchTerm);

    return (
      <ErrorBoundary>
        <main className="app">
          <Header />

          <Search onSearch={this.handleSearch} />

          <Results pokemons={pokemons} loading={loading} error={error} />

          {!isSearchMode && (
            <div className="pagination">
              <button
                className="button"
                type="button"
                onClick={this.handlePreviousPage}
                disabled={offset === 0 || loading}
              >
                Previous
              </button>

              <button
                className="button"
                type="button"
                onClick={this.handleNextPage}
                disabled={loading}
              >
                Next
              </button>
            </div>
          )}

          <ErrorButton />
        </main>
      </ErrorBoundary>
    );
  }
}

export default App;
