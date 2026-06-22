'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePokemonDetailsQuery } from '../../../../hooks/use-pokemon-details-query';
import Image from 'next/image';

export default function PokemonDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const parsedPokemonId = useMemo(() => {
    const value = Number(params.pokemonId);

    return Number.isInteger(value) ? value : null;
  }, [params]);

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
      {isLoading && (
        <p className="status-message">Loading details...</p>
      )}

      {error && (
        <p className="error-message">
          Could not load pokemon details.
        </p>
      )}

      {!isLoading && !error && pokemon && (
        <>
          <div className="details-panel__content">
            <Image
              className="details-panel__image"
              src={pokemon.image}
              alt={pokemon.name}
              width={300}
              height={300}
            />

            <div>
              <h2>{pokemon.name}</h2>
              <p>{pokemon.description}</p>
            </div>
          </div>

          <button
            className="details-panel__close"
            type="button"
            onClick={() => router.push('/')}
          >
            Close
          </button>
        </>
      )}
    </aside>
  );
}