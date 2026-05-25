import { useSelectedPokemonStore } from '../../store/selected-pokemon-store';

export const SelectedPokemonsFlyout = () => {
  const selectedPokemons = useSelectedPokemonStore(
    (state) => state.selectedPokemons
  );

  const clearSelectedPokemons = useSelectedPokemonStore(
    (state) => state.clearSelectedPokemons
  );

  if (selectedPokemons.length === 0) {
    return null;
  }

  return (
    <aside className="selected-pokemons-flyout">
      <p>
        Selected pokemons:
        {' '}
        <strong>{selectedPokemons.length}</strong>
      </p>

      <div className="selected-pokemons-flyout__actions">
        <button
          type="button"
          onClick={clearSelectedPokemons}
        >
          Unselect all
        </button>

        <button type="button">
          Download
        </button>
      </div>
    </aside>
  );
};