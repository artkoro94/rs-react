import { render, screen } from '@testing-library/react';
import { UncontrolledForm } from './uncontrolled-form';
import {
  describe,
  it,
  expect,
} from 'vitest';
import { fireEvent } from '@testing-library/react';
import { useFormStore } from '../../store/form-store';
import { vi } from 'vitest';

describe('UncontrolledForm', () => {
  it('renders form fields', () => {
    render(<UncontrolledForm />);

    expect(
      screen.getByLabelText(/name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/^password$/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /submit/i,
      })
    ).toBeInTheDocument();
  });
});

it('shows validation errors on submit', () => {
  render(<UncontrolledForm />);

  fireEvent.click(
    screen.getByRole('button', {
      name: /submit/i,
    })
  );

expect(
  screen.getAllByText(/select gender/i)
    .length
).toBeGreaterThan(0);
});

it('updates password strength', () => {
  render(<UncontrolledForm />);

  fireEvent.change(
    screen.getByLabelText(/^password$/i),
    {
      target: {
        value: 'Password1!',
      },
    }
  );

  expect(
    screen.getByText(/uppercase/i)
  ).toBeInTheDocument();
});

it('submits valid form', () => {
  const addSubmission = vi.fn();

  useFormStore.setState({
    submissions: [],
    addSubmission,
  });

  render(<UncontrolledForm />);

  fireEvent.change(
    screen.getByLabelText(/name/i),
    {
      target: { value: 'John' },
    }
  );

  fireEvent.change(
    screen.getByRole('spinbutton'),
    {
      target: { value: '25' },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/email/i),
    {
      target: {
        value: 'john@test.com',
      },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/gender/i),
    {
      target: {
        value: 'male',
      },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/country/i),
    {
      target: {
        value: 'Germany',
      },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/^password$/i),
    {
      target: {
        value: 'Password1!',
      },
    }
  );

  fireEvent.change(
    screen.getByLabelText(
      /confirm password/i
    ),
    {
      target: {
        value: 'Password1!',
      },
    }
  );

  fireEvent.click(
    screen.getByRole('checkbox')
  );

  fireEvent.click(
    screen.getByRole('button', {
      name: /submit/i,
    })
  );

  expect(addSubmission).toHaveBeenCalled();
});

it('shows image preview', async () => {
  render(<UncontrolledForm />);

  const file = new File(
    ['image'],
    'test.png',
    {
      type: 'image/png',
    }
  );

  const input =
    screen.getByLabelText(/image/i);

  fireEvent.change(input, {
    target: {
      files: [file],
    },
  });

  expect(
    await screen.findByAltText(
      /preview/i
    )
  ).toBeInTheDocument();
});