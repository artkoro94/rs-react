import { create } from 'zustand';
import type { PokemonCardData } from '../shared/api/pokemon-api';

interface SelectedPokemonStore {
  selectedPokemons: PokemonCardData[];

  togglePokemon: (pokemon: PokemonCardData) => void;

  clearSelectedPokemons: () => void;

  isPokemonSelected: (pokemonId: number) => boolean;
}

export const useSelectedPokemonStore = create<SelectedPokemonStore>(
  (set, get) => ({
    selectedPokemons: [],

    togglePokemon: (pokemon) => {
      const selectedPokemons = get().selectedPokemons;

      const isSelected = selectedPokemons.some(
        (item) => item.id === pokemon.id
      );

      if (isSelected) {
        set({
          selectedPokemons: selectedPokemons.filter(
            (item) => item.id !== pokemon.id
          ),
        });

        return;
      }

      set({
        selectedPokemons: [...selectedPokemons, pokemon],
      });
    },

    clearSelectedPokemons: () => {
      set({
        selectedPokemons: [],
      });
    },

    isPokemonSelected: (pokemonId) => {
      return get().selectedPokemons.some(
        (pokemon) => pokemon.id === pokemonId
      );
    },
  })
);