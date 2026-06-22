import { QueryClient } from '@tanstack/react-query';

const cacheTtl = Number(process.env.NEXT_PUBLIC_QUERY_CACHE_TTL ?? 60000);

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