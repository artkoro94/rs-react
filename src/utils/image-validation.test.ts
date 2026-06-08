import { describe, expect, it } from 'vitest';
import { validateImage } from './image-validation';

describe('validateImage', () => {
  it('returns true for valid png image', () => {
    const file = new File(['test'], 'image.png', {
      type: 'image/png',
    });

    expect(validateImage(file)).toBe(true);
  });

  it('returns false for invalid type', () => {
    const file = new File(['test'], 'file.txt', {
      type: 'text/plain',
    });

    expect(validateImage(file)).toBe(false);
  });

  it('returns false for oversized file', () => {
    const file = new File(
      [new Uint8Array(3 * 1024 * 1024)],
      'big.png',
      {
        type: 'image/png',
      }
    );

    expect(validateImage(file)).toBe(false);
  });
});