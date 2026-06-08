import { describe, expect, it } from 'vitest';
import { formSchema } from './form-schema';

describe('formSchema', () => {
  it('validates correct data', () => {
    const result = formSchema.safeParse({
      name: 'John',
      age: 25,
      email: 'john@test.com',
      gender: 'male',
      country: 'Germany',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      termsAccepted: true,
    });

    expect(result.success).toBe(true);
  });

  it('rejects lowercase first letter', () => {
    const result = formSchema.safeParse({
      name: 'john',
      age: 25,
      email: 'john@test.com',
      gender: 'male',
      country: 'Germany',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      termsAccepted: true,
    });

    expect(result.success).toBe(false);
  });

  it('rejects different passwords', () => {
    const result = formSchema.safeParse({
      name: 'John',
      age: 25,
      email: 'john@test.com',
      gender: 'male',
      country: 'Germany',
      password: 'Password1!',
      confirmPassword: 'Password2!',
      termsAccepted: true,
    });

    expect(result.success).toBe(false);
  });
});