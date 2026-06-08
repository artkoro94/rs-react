import { describe, expect, it, vi } from 'vitest';
import { fileToBase64 } from './file-to-base64';

describe('fileToBase64', () => {
  it('converts file to base64', async () => {
    class MockFileReader {
      result = 'data:image/png;base64,test';

      onload: (() => void) | null = null;

      readAsDataURL() {
        this.onload?.();
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    const file = new File(['test'], 'test.png', {
      type: 'image/png',
    });

    const result = await fileToBase64(file);

    expect(result).toBe(
      'data:image/png;base64,test'
    );
  });
});