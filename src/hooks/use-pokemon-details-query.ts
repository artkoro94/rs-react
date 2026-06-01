import { useQuery } from '@tanstack/react-query';

import {
  fetchPokemonById,
  type PokemonCardData,
} from '../shared/api/pokemon-api';

export const usePokemonDetailsQuery = (
  pokemonId: number | null
) => {
  return useQuery<PokemonCardData>({
    queryKey: ['pokemon-details', pokemonId],
    queryFn: () => fetchPokemonById(pokemonId as number),
    enabled: pokemonId !== null,
  });
};