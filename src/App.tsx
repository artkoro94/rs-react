import React from 'react';
import './App.css';
import { fetchPokemons, PokemonListItem } from './shared/api/pokemon-api';

interface State {
  pokemons: PokemonListItem[];
  loading: boolean;
  error: string | null;
}

class App extends React.Component<object, State> {
  state: State = {
    pokemons: [],
    loading: false,
    error: null,
  };

  componentDidMount(): void {
    this.loadPokemons();
  }

  loadPokemons = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await fetchPokemons(10, 0);

      this.setState({
        pokemons: data.results,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Ошибка загрузки',
        loading: false,
      });
    }
  };

  render() {
    const { pokemons, loading, error } = this.state;

    return (
      <div>
        <h1>Pokemons</h1>

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;