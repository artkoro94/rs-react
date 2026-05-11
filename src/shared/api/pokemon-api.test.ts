import { fetchPokemons } from './pokemon-api';

const pikachuDetails = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: [
    {
      type: {
        name: 'electric',
      },
    },
  ],
};

const bulbasaurDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [
    {
      type: {
        name: 'grass',
      },
    },
    {
      type: {
        name: 'poison',
      },
    },
  ],
};

const createResponse = <TData,>(ok: boolean, data: TData): Response =>
  ({
    ok,
    json: vi.fn().mockResolvedValue(data),
  }) as unknown as Response;

describe('pokemon-api', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('fetches pokemon by search term', async () => {
    fetchMock.mockResolvedValueOnce(createResponse(true, pikachuDetails));

    const pokemons = await fetchPokemons('  PIKACHU  ', 0);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );

    expect(pokemons).toEqual([
      {
        id: 25,
        name: 'pikachu',
        description: 'Types: electric. Height: 4. Weight: 60.',
      },
    ]);
  });

  it('throws an error when searched pokemon is not found', async () => {
    fetchMock.mockResolvedValueOnce(createResponse(false, {}));

    await expect(fetchPokemons('missingno', 0)).rejects.toThrow(
      'Pokemon not found'
    );
  });

  it('fetches pokemon list with pagination and loads pokemon details', async () => {
    fetchMock
      .mockResolvedValueOnce(
        createResponse(true, {
          results: [
            {
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon/25/',
            },
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
          ],
        })
      )
      .mockResolvedValueOnce(createResponse(true, pikachuDetails))
      .mockResolvedValueOnce(createResponse(true, bulbasaurDetails));

    const pokemons = await fetchPokemons('', 10);

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=10'
    );

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://pokeapi.co/api/v2/pokemon/25/'
    );

    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'https://pokeapi.co/api/v2/pokemon/1/'
    );

    expect(pokemons).toEqual([
      {
        id: 25,
        name: 'pikachu',
        description: 'Types: electric. Height: 4. Weight: 60.',
      },
      {
        id: 1,
        name: 'bulbasaur',
        description: 'Types: grass, poison. Height: 7. Weight: 69.',
      },
    ]);
  });

  it('throws an error when pokemon list request fails', async () => {
    fetchMock.mockResolvedValueOnce(createResponse(false, {}));

    await expect(fetchPokemons('', 0)).rejects.toThrow(
      'Failed to fetch pokemons'
    );
  });

  it('throws an error when pokemon details request fails', async () => {
    fetchMock
      .mockResolvedValueOnce(
        createResponse(true, {
          results: [
            {
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon/25/',
            },
          ],
        })
      )
      .mockResolvedValueOnce(createResponse(false, {}));

    await expect(fetchPokemons('', 0)).rejects.toThrow(
      'Failed to fetch pokemon details'
    );
  });
});