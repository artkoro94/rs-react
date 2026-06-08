import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Modal } from './modal';
import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

describe('Modal', () => {
  it('renders title', () => {
    render(
      <Modal
        title="Test Modal"
        isOpen={true}
        onClose={() => {}}
      >
        <div>content</div>
      </Modal>
    );

    expect(
      screen.getByText('Test Modal')
    ).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal
        title="Test"
        isOpen={false}
        onClose={() => {}}
      >
        <div>content</div>
      </Modal>
    );

    expect(
      screen.queryByText('Test')
    ).not.toBeInTheDocument();
  });
});

it('does not render when closed', () => {
  render(
    <Modal
      title="Test modal"
      isOpen={false}
      onClose={() => {}}
    >
      Content
    </Modal>
  );

  expect(
    screen.queryByText('Content')
  ).not.toBeInTheDocument();
});

it('calls onClose', () => {
  const onClose = vi.fn();

  render(
    <Modal
      title="Test modal"
      isOpen={true}
      onClose={onClose}
    >
      Content
    </Modal>
  );

  fireEvent.click(
    screen.getByRole('button')
  );

  expect(onClose)
    .toHaveBeenCalled();
});