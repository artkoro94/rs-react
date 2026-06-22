import { Link } from '../../i18n/navigation';
import Image from 'next/image';
import type { PokemonCardData } from '../../shared/api/pokemon-api';
import { useSelectedPokemonStore } from '../../store/selected-pokemon-store';
interface PokemonCardProps {
  pokemon: PokemonCardData;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {

  const togglePokemon = useSelectedPokemonStore(
  (state) => state.togglePokemon
);

const isPokemonSelected = useSelectedPokemonStore((state) =>
  state.isPokemonSelected(pokemon.id)
);

  return (
    <Link
      className="pokemon-card"
      href={`/pokemon/${pokemon.id}`}
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
          <Image
            className="pokemon-card__image"
            src={pokemon.image}
            alt={pokemon.name}
            width={200}
            height={200}
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