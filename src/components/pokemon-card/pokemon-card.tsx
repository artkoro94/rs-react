import { Link, useSearchParams } from 'react-router-dom';
import type { PokemonCardData } from '../../shared/api/pokemon-api';
import { useSelectedPokemonStore } from '../../store/selected-pokemon-store';
interface PokemonCardProps {
  pokemon: PokemonCardData;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [searchParams] = useSearchParams();
  const nextSearchParams = new URLSearchParams(searchParams);

  const togglePokemon = useSelectedPokemonStore(
  (state) => state.togglePokemon
);

const isPokemonSelected = useSelectedPokemonStore((state) =>
  state.isPokemonSelected(pokemon.id)
);

  if (!nextSearchParams.get('page')) {
    nextSearchParams.set('page', '1');
  }

  return (
    <Link
      className="pokemon-card"
      to={`/pokemon/${pokemon.id}?${nextSearchParams.toString()}`}
    >
      <article className="pokemon-card__content">
        <input
  type="checkbox"
  checked={isPokemonSelected}
  onChange={() => togglePokemon(pokemon)}
  onClick={(event) => event.stopPropagation()}
  aria-label={`Select ${pokemon.name}`}
/>
        <div className="pokemon-card__image-wrapper">
          <img
            className="pokemon-card__image"
            src={pokemon.image}
            alt={pokemon.name}
          />
        </div>

        <div>
          <h3>{pokemon.name}</h3>
          <p>{pokemon.description}</p>
        </div>
      </article>
    </Link>
  );
};