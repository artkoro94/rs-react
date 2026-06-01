import type { PokemonCardData } from '../../shared/api/pokemon-api';
import { PokemonList } from '../pokemon-list/pokemon-list';

interface ResultsProps {
  pokemons: PokemonCardData[];
  loading: boolean;
  error: Error | null;
}

export const Results = ({ pokemons, loading, error }: ResultsProps) => {
  return (
    <section className="results-section">
      <h2>Results</h2>

      {loading && <p className="status-message">Loading...</p>}

      {error && ( <p className="error-message">Could not load pokemons. Try another name.</p>)}

      {!loading && !error && pokemons.length === 0 && (
        <p className="status-message">No pokemons found.</p>
      )}

      {!loading && !error && pokemons.length > 0 && (
        <PokemonList pokemons={pokemons} />
      )}
    </section>
  );
};