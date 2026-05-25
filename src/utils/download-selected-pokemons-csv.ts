import type { PokemonCardData } from '../shared/api/pokemon-api';

const createCsvRow = (values: string[]): string => {
  return values
    .map((value) => `"${value.replaceAll('"', '""')}"`)
    .join(',');
};

export const downloadSelectedPokemonsCsv = (
  pokemons: PokemonCardData[]
) => {
  const headers = ['Name', 'Description', 'Image', 'Types'];

  const rows = pokemons.map((pokemon) =>
    createCsvRow([
      pokemon.name,
      pokemon.description,
      pokemon.image,
      pokemon.types.join(', '),
    ])
  );

  const csvContent = [createCsvRow(headers), ...rows].join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;

  link.download = `${pokemons.length}_items.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};