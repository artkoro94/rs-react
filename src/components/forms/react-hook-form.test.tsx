import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ReactHookForm } from './react-hook-form';

describe('ReactHookForm', () => {
  it('renders form fields', () => {
    render(
      <ReactHookForm
        onSuccess={() => {}}
      />
    );

    expect(
      screen.getByLabelText(/name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/confirm password/i)
    ).toBeInTheDocument();
  });
});

it('renders submit button', () => {
  render(
    <ReactHookForm
      onSuccess={() => {}}
    />
  );

  expect(
    screen.getByRole('button', {
      name: /submit/i,
    })
  ).toBeInTheDocument();
});