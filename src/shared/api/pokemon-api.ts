export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonCardData {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

interface PokemonDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: {
      ['official-artwork']: {
        front_default: string | null;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const PAGE_LIMIT = 10;
const FALLBACK_IMAGE = '/icons.svg';

const getPokemonDescription = (pokemon: PokemonDetailsResponse): string => {
  const types = pokemon.types.map((item) => item.type.name).join(', ');

  return `Types: ${types}. Height: ${pokemon.height}. Weight: ${pokemon.weight}.`;
};

const getPokemonImage = (pokemon: PokemonDetailsResponse): string => {
  return (
    pokemon.sprites.other['official-artwork'].front_default ??
    pokemon.sprites.front_default ??
    FALLBACK_IMAGE
  );
};

const mapPokemonDetails = (
  pokemon: PokemonDetailsResponse
): PokemonCardData => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    description: getPokemonDescription(pokemon),
    image: getPokemonImage(pokemon),
  };
};

const fetchPokemonDetails = async (
  url: string
): Promise<PokemonCardData> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon details');
  }

  const data = (await response.json()) as PokemonDetailsResponse;

  return mapPokemonDetails(data);
};

export const fetchPokemonById = async (
  pokemonId: number
): Promise<PokemonCardData> => {
  return fetchPokemonDetails(`${BASE_URL}/${pokemonId}`);
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

    const data = (await response.json()) as PokemonDetailsResponse;

    return [mapPokemonDetails(data)];
  }

  const response = await fetch(
    `${BASE_URL}?limit=${PAGE_LIMIT}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch pokemons');
  }

  const data = (await response.json()) as PokemonListResponse;

  return Promise.all(
    data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
  );
};