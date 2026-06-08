import { render, screen, fireEvent } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';

import App from './App';
import { useFormStore } from './store/form-store';

describe('App', () => {
  beforeEach(() => {
    useFormStore.setState({
      submissions: [],
    });
  });

  it('renders main page', () => {
    render(<App />);

    expect(
      screen.getByText(/react forms/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /open uncontrolled form/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /open react hook form/i,
      })
    ).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<App />);

    expect(
      screen.getByText(/no submissions yet/i)
    ).toBeInTheDocument();
  });

it('opens uncontrolled form modal', () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole('button', {
      name: /open uncontrolled form/i,
    })
  );

  expect(
    screen.getByRole('dialog', {
      name: /uncontrolled form/i,
    })
  ).toBeInTheDocument();
});

it('opens react hook form modal', () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole('button', {
      name: /open react hook form/i,
    })
  );

  expect(
    screen.getByRole('dialog', {
      name: /react hook form/i,
    })
  ).toBeInTheDocument();
});

  it('renders submissions list', () => {
    useFormStore.setState({
      submissions: [
        {
          id: '1',
          createdAt: Date.now(),
          name: 'John',
          age: 25,
          email: 'john@test.com',
          gender: 'male',
          country: 'Germany',
          password: 'Password1!',
          image: '',
          termsAccepted: true,
        },
      ],
    });

    render(<App />);

    expect(
      screen.getByText('John')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'john@test.com'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText('Germany')
    ).toBeInTheDocument();
  });

  it('renders submission image', () => {
    useFormStore.setState({
      submissions: [
        {
          id: '1',
          createdAt: Date.now(),
          name: 'John',
          age: 25,
          email: 'john@test.com',
          gender: 'male',
          country: 'Germany',
          password: 'Password1!',
          image: 'data:image/png;base64,test',
          termsAccepted: true,
        },
      ],
    });

    render(<App />);

    expect(
      screen.getByRole('img', {
        name: 'John',
      })
    ).toBeInTheDocument();
  });
});

it('renders submissions list', () => {
  useFormStore.setState({
    submissions: [
      {
        id: '1',
        createdAt: Date.now(),
        name: 'John',
        age: 25,
        email: 'john@test.com',
        gender: 'male',
        country: 'Germany',
        password: 'Password1!',
        image: 'base64-image',
        termsAccepted: true,
      },
    ],
  });

  render(<App />);

  expect(
    screen.getByText('John')
  ).toBeInTheDocument();

  expect(
    screen.getByText('john@test.com')
  ).toBeInTheDocument();

  expect(
    screen.getByText('Germany')
  ).toBeInTheDocument();

  expect(
    screen.getByRole('img')
  ).toBeInTheDocument();
});