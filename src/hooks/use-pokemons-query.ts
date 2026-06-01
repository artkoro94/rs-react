import { useQuery } from '@tanstack/react-query';

import { fetchPokemons } from '../shared/api/pokemon-api';
import type { PokemonCardData } from '../shared/api/pokemon-api';

export const usePokemonsQuery = (
  searchTerm: string,
  offset: number
) => {
  return useQuery<PokemonCardData[]>({
    queryKey: ['pokemons', searchTerm, offset],
    queryFn: () => fetchPokemons(searchTerm, offset),
  });
};