import { useQueryClient } from '@tanstack/react-query';

export const RefreshButton = () => {
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    });

    await queryClient.invalidateQueries({
      queryKey: ['pokemon-details'],
    });
  };

  return (
    <button
      className="button"
      type="button"
      onClick={handleRefresh}
    >
      Refresh
    </button>
  );
};