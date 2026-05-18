import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import {
  fetchPokemonById,
  type PokemonCardData,
} from '../shared/api/pokemon-api';

export const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<PokemonCardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    let ignore = false;

    const loadPokemonDetails = async () => {
      const parsedPokemonId = Number(pokemonId);

      if (!Number.isInteger(parsedPokemonId)) {
        setPokemon(null);
        setError('Pokemon was not found.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const loadedPokemon = await fetchPokemonById(parsedPokemonId);

        if (!ignore) {
          setPokemon(loadedPokemon);
        }
      } catch {
        if (!ignore) {
          setPokemon(null);
          setError('Could not load pokemon details.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadPokemonDetails();

    return () => {
      ignore = true;
    };
  }, [pokemonId]);

  return (
<aside className="details-panel">
  {loading && <p className="status-message">Loading details...</p>}

  {error && <p className="error-message">{error}</p>}

  {!loading && !error && pokemon && (
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