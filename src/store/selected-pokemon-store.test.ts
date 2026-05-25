import { beforeEach, describe, expect, it } from 'vitest';
import { useSelectedPokemonStore } from './selected-pokemon-store';

const mockPokemon = {
  id: 25,
  name: 'pikachu',
  description: 'Electric pokemon',
  image: 'pikachu.png',
  types: ['electric'],
};

describe('selected pokemon store', () => {
  beforeEach(() => {
    useSelectedPokemonStore.setState({
      selectedPokemons: [],
    });
  });

  it('adds pokemon to selected list', () => {
    useSelectedPokemonStore
      .getState()
      .togglePokemon(mockPokemon);

    expect(
      useSelectedPokemonStore.getState().selectedPokemons
    ).toEqual([mockPokemon]);
  });

  it('removes pokemon if already selected', () => {
    const store = useSelectedPokemonStore.getState();

    store.togglePokemon(mockPokemon);
    store.togglePokemon(mockPokemon);

    expect(store.selectedPokemons).toEqual([]);
  });

  it('clears selected pokemons', () => {
    const store = useSelectedPokemonStore.getState();

    store.togglePokemon(mockPokemon);

    store.clearSelectedPokemons();

    expect(store.selectedPokemons).toEqual([]);
  });

  it('checks if pokemon is selected', () => {
    const store = useSelectedPokemonStore.getState();

    store.togglePokemon(mockPokemon);

    expect(store.isPokemonSelected(25)).toBe(true);

    expect(store.isPokemonSelected(1)).toBe(false);
  });
});