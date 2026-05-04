export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonCardData {
  id: number;
  name: string;
  description: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

interface PokemonDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const PAGE_LIMIT = 10;

const getPokemonDescription = (pokemon: PokemonDetailsResponse): string => {
  const types = pokemon.types.map((item) => item.type.name).join(', ');

  return `Types: ${types}. Height: ${pokemon.height}. Weight: ${pokemon.weight}.`;
};

const fetchPokemonDetails = async (url: string): Promise<PokemonCardData> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon details');
  }

  const data: PokemonDetailsResponse = await response.json();

  return {
    id: data.id,
    name: data.name,
    description: getPokemonDescription(data),
  };
};

export const fetchPokemons = async (
  searchTerm: string,
  offset: number
): Promise<PokemonCardData[]> => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  if (normalizedSearchTerm) {
    const response = await fetch(`${BASE_URL}/${normalizedSearchTerm}`);

    if (!response.ok) {
      throw new Error('Pokemon not found');
    }

    const data: PokemonDetailsResponse = await response.json();

    return [
      {
        id: data.id,
        name: data.name,
        description: getPokemonDescription(data),
      },
    ];
  }

  const response = await fetch(`${BASE_URL}?limit=${PAGE_LIMIT}&offset=${offset}`);

  if (!response.ok) {
    throw new Error('Failed to fetch pokemons');
  }

  const data: PokemonListResponse = await response.json();

  return Promise.all(data.results.map((pokemon) => fetchPokemonDetails(pokemon.url)));
};