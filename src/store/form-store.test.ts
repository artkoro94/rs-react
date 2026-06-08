import { describe, expect, it } from 'vitest';
import { useFormStore } from './form-store';

describe('form-store', () => {
  it('adds submission', () => {
    useFormStore.setState({
      submissions: [],
    });

    useFormStore.getState().addSubmission({
      id: '1',
      createdAt: Date.now(),
      name: 'John',
      age: 20,
      email: 'john@test.com',
      gender: 'male',
      country: 'Germany',
      password: 'Abc123!',
      image: '',
      termsAccepted: true,
    });

    expect(
      useFormStore.getState().submissions
    ).toHaveLength(1);
  });
});