import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ErrorBoundary } from '../error-boundary/error-boundary';
import { ErrorButton } from './error-button';

describe('ErrorButton', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders test error button', () => {
    render(<ErrorButton />);

    expect(
      screen.getByRole('button', { name: 'Test error' })
    ).toBeInTheDocument();
  });

  it('shows error boundary fallback after button click', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Test error' }));

    expect(
      screen.getByRole('heading', { name: 'Something went wrong' })
    ).toBeInTheDocument();

    expect(
      screen.getByText('The app caught an error. Reload the page to continue.')
    ).toBeInTheDocument();
  });

  it('logs error after button click', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Test error' }));

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});