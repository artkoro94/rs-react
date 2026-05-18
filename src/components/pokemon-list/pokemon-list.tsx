import type { PokemonCardData } from '../../shared/api/pokemon-api';
import { PokemonCard } from '../pokemon-card/pokemon-card';

interface PokemonListProps {
  pokemons: PokemonCardData[];
}

export const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};