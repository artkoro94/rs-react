import { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { usePokemonDetailsQuery } from '../../hooks/use-pokemon-details-query';

export const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const closeDetails = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (!nextSearchParams.get('page')) {
      nextSearchParams.set('page', '1');
    }

    navigate({
      pathname: '/',
      search: nextSearchParams.toString(),
    });
  };

  const parsedPokemonId = useMemo(() => {
  const value = Number(pokemonId);

  return Number.isInteger(value) ? value : null;
}, [pokemonId]);

const {
  data: pokemon,
  isLoading,
  error,
} = usePokemonDetailsQuery(parsedPokemonId);

if (parsedPokemonId === null) {
  return (
    <aside className="details-panel">
      <p className="error-message">Pokemon was not found.</p>
    </aside>
  );
}

  return (
<aside className="details-panel">
  {isLoading && <p className="status-message">Loading details...</p>}

  {error && <p className="error-message">Could not load pokemon details.</p>}

  {!isLoading && !error && pokemon && (
    <>
      <div className="details-panel__content">
        <img
          className="details-panel__image"
          src={pokemon.image}
          alt={pokemon.name}
        />

        <h2>{pokemon.name}</h2>
        <p>{pokemon.description}</p>
      </div>

      <button
        className="details-panel__close"
        type="button"
        onClick={closeDetails}
      >
        Close
      </button>
    </>
  )}
</aside>
  );
};