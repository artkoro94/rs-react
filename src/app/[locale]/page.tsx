'use client';

import { useState } from 'react';

import { Search } from '../../components/search/search';
import { Results } from '../../components/results/results';
import { RefreshButton } from '../../components/refresh-button/refresh-button';

import { usePokemonsQuery } from '../../hooks/use-pokemons-query';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [offset] = useState(0);

  const {
    data: pokemons = [],
    isLoading,
    error,
  } = usePokemonsQuery(searchTerm, offset);

  return (
    <main className="app">
      <Search onSearch={setSearchTerm} />

      <RefreshButton />

      <Results
        pokemons={pokemons}
        loading={isLoading}
        error={error as Error | null}
      />
    </main>
  );
}

