import { describe, expect, it, vi } from 'vitest';
import { downloadSelectedPokemonsCsv } from './download-selected-pokemons-csv';

describe('downloadSelectedPokemonsCsv', () => {
  it('creates csv download', () => {
    const createObjectUrlSpy = vi.spyOn(
      URL,
      'createObjectURL'
    );

    createObjectUrlSpy.mockReturnValue('blob:test');

    const revokeObjectUrlSpy = vi.spyOn(
      URL,
      'revokeObjectURL'
    );

    const clickMock = vi.fn();

    const anchorElement = document.createElement('a');

    anchorElement.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(
      anchorElement
    );

    downloadSelectedPokemonsCsv([
      {
        id: 25,
        name: 'pikachu',
        description: 'Electric pokemon',
        image: 'pikachu.png',
        types: ['electric'],
      },
    ]);

    expect(createObjectUrlSpy).toHaveBeenCalled();

    expect(clickMock).toHaveBeenCalled();

    expect(revokeObjectUrlSpy).toHaveBeenCalled();
  });
});