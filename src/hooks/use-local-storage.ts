import { useState } from 'react';

type SetStoredValue<T> = (value: T) => void;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, SetStoredValue<T>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    if (!item) {
      return initialValue;
    }

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as T;
    }
  });

  const setValue: SetStoredValue<T> = (value) => {
    setStoredValue(value);

    if (typeof value === 'string') {
      localStorage.setItem(key, value);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};