import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from './error-boundary';

const BrokenComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Application content</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Application content')).toBeInTheDocument();
  });

  it('renders fallback UI when child component throws an error', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: 'Something went wrong' })
    ).toBeInTheDocument();

    expect(
      screen.getByText('The app caught an error. Reload the page to continue.')
    ).toBeInTheDocument();
  });

  it('logs caught error to console', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});