import { describe, expect, it } from 'vitest';
import { createSubmission } from './create-submission';

describe('createSubmission', () => {
  it('creates submission object', () => {
    const submission = createSubmission({
      name: 'John',
      age: 25,
      email: 'john@test.com',
      gender: 'male',
      country: 'Germany',
      password: 'Password1!',
      image: '',
      termsAccepted: true,
    });

    expect(submission.name).toBe('John');
    expect(submission.age).toBe(25);
    expect(submission.id).toBeDefined();
    expect(submission.createdAt).toBeDefined();
  });
});