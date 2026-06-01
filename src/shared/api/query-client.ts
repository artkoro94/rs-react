import { QueryClient } from '@tanstack/react-query';

const cacheTtl = Number(import.meta.env.VITE_QUERY_CACHE_TTL);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: cacheTtl,
      gcTime: cacheTtl,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});