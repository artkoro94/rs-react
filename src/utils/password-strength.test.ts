import { describe, expect, it } from 'vitest';
import { getPasswordStrength } from './password-strength';

describe('getPasswordStrength', () => {
  it('returns all false for empty password', () => {
    expect(getPasswordStrength('')).toEqual({
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    });
  });

  it('detects lowercase only', () => {
    expect(getPasswordStrength('abc')).toEqual({
      hasLowercase: true,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    });
  });

  it('detects strong password', () => {
    expect(getPasswordStrength('Abc123!')).toEqual({
      hasLowercase: true,
      hasUppercase: true,
      hasNumber: true,
      hasSpecial: true,
    });
  });
});