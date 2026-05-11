import type { PokemonCardData } from '../api/pokemon-api';

export const pikachuMock: PokemonCardData = {
  id: 25,
  name: 'Pikachu',
  description: 'Types: electric. Height: 4. Weight: 60.',
};

export const bulbasaurMock: PokemonCardData = {
  id: 1,
  name: 'Bulbasaur',
  description: 'Types: grass, poison. Height: 7. Weight: 69.',
};

export const pokemonListMock: PokemonCardData[] = [
  pikachuMock,
  bulbasaurMock,
];