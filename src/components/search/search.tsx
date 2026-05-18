import { useState } from 'react';
import { SEARCH_STORAGE_KEY } from '../../shared/constants/storage';
import { useLocalStorage } from '../../hooks/use-local-storage';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [savedSearchTerm, setSavedSearchTerm] = useLocalStorage<string>(
    SEARCH_STORAGE_KEY,
    ''
  );
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm);
  const [lastSubmittedSearchTerm, setLastSubmittedSearchTerm] =
    useState(savedSearchTerm);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === lastSubmittedSearchTerm) {
      return;
    }

    setSavedSearchTerm(trimmedSearchTerm);
    setSearchTerm(trimmedSearchTerm);
    setLastSubmittedSearchTerm(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <section className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          value={searchTerm}
          onChange={handleChange}
          placeholder="pikachu"
          className="search-input"
        />

        <button className="button" type="submit">
          Search
        </button>
      </form>
    </section>
  );
};