import { useCallback, useEffect, useState } from 'react';
import {
  Outlet,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { ErrorButton } from './components/error-button/error-button';
import { Header } from './components/header';
import { Results } from './components/results/results';
import { Search } from './components/search/search';
import { AboutPage } from './pages/about-page/about-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { PokemonDetails } from './pages/pokemon-details/pokemon-details';
import { fetchPokemons, type PokemonCardData } from './shared/api/pokemon-api';
import { SEARCH_STORAGE_KEY } from './shared/constants/storage';
import { useLocalStorage } from './hooks/use-local-storage';
import { SelectedPokemonsFlyout } from './components/selected-pokemons-flyout/selected-pokemons-flyout';

const PAGE_OFFSET_STEP = 10;
const PAGE_QUERY_KEY = 'page';

const getPageFromSearchParams = (searchParams: URLSearchParams): number => {
  const page = Number(searchParams.get(PAGE_QUERY_KEY));

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
};

const HomePage = () => {
  const [savedSearchTerm] = useLocalStorage<string>(SEARCH_STORAGE_KEY, '');
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const detailsMatch = useMatch('/pokemon/:pokemonId');

  const page = getPageFromSearchParams(searchParams);
  const offset = (page - 1) * PAGE_OFFSET_STEP;
  const hasDetails = Boolean(detailsMatch);

  useEffect(() => {
    const pageParam = searchParams.get(PAGE_QUERY_KEY);

    if (pageParam !== String(page)) {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set(PAGE_QUERY_KEY, String(page));

      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [page, searchParams, setSearchParams]);

  useEffect(() => {
    let ignore = false;

    const loadPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const loadedPokemons = await fetchPokemons(searchTerm, offset);

        if (!ignore) {
          setPokemons(loadedPokemons);
        }
      } catch {
        if (!ignore) {
          setPokemons([]);
          setError('Could not load pokemons. Try another name.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadPokemons();

    return () => {
      ignore = true;
    };
  }, [offset, searchTerm]);

  const updatePage = useCallback(
    (nextPage: number) => {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set(PAGE_QUERY_KEY, String(nextPage));

      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const closeDetails = useCallback(() => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(PAGE_QUERY_KEY, String(page));

    navigate({
      pathname: '/',
      search: nextSearchParams.toString(),
    });
  }, [navigate, page, searchParams]);

  const handleSearch = useCallback(
    (nextSearchTerm: string) => {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set(PAGE_QUERY_KEY, '1');

      setSearchTerm(nextSearchTerm);

      navigate({
        pathname: '/',
        search: nextSearchParams.toString(),
      });
    },
    [navigate, searchParams]
  );

  const handleNextPage = () => {
    updatePage(page + 1);
  };

  const handlePreviousPage = () => {
    updatePage(Math.max(page - 1, 1));
  };

  const handleMasterPanelClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (event.target === event.currentTarget && hasDetails) {
      closeDetails();
    }
  };

  return (
    <ErrorBoundary>
      <main className="app">
        <Header />

        <Search onSearch={handleSearch} />

        <div className={hasDetails ? 'content content--split' : 'content'}>
          <div className="master-panel" onClick={handleMasterPanelClick}>
            <Results pokemons={pokemons} loading={loading} error={error} />

            {!loading && !error && pokemons.length > 0 && (
              <div className="pagination">
                <button
                  className="button"
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <span className="pagination__page">Page {page}</span>

                <button
                  className="button"
                  type="button"
                  onClick={handleNextPage}
                  disabled={pokemons.length < PAGE_OFFSET_STEP}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <Outlet />
        </div>
        <SelectedPokemonsFlyout />
        
        <ErrorButton />
      </main>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="pokemon/:pokemonId" element={<PokemonDetails />} />
      </Route>

      <Route path="/about" element={<AboutPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;