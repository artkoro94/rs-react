import { Link, useSearchParams } from 'react-router';
import type { PokemonCardData } from '../../shared/api/pokemon-api';

interface PokemonCardProps {
  pokemon: PokemonCardData;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [searchParams] = useSearchParams();
  const nextSearchParams = new URLSearchParams(searchParams);

  if (!nextSearchParams.get('page')) {
    nextSearchParams.set('page', '1');
  }

  return (
    <Link
      className="pokemon-card"
      to={`/pokemon/${pokemon.id}?${nextSearchParams.toString()}`}
    >
      <article>
        <h3>{pokemon.name}</h3>
        <p>{pokemon.description}</p>
      </article>
    </Link>
  );
};