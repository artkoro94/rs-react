import { useState } from 'react';

export const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Test application error');
  }

  return (
    <button
      className="error-button"
      type="button"
      onClick={() => setHasError(true)}
    >
      Test error
    </button>
  );
};