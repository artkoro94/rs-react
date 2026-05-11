import React from 'react';
import { SEARCH_STORAGE_KEY } from '../../shared/constants/storage';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
  lastSubmittedSearchTerm: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    searchTerm: localStorage.getItem(SEARCH_STORAGE_KEY) ?? '',
    lastSubmittedSearchTerm: '',
  };

  componentDidMount(): void {
    this.props.onSearch(this.state.searchTerm);
    this.setState({ lastSubmittedSearchTerm: this.state.searchTerm.trim() });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmedSearchTerm = this.state.searchTerm.trim();

    if (trimmedSearchTerm === this.state.lastSubmittedSearchTerm) {
      return;
    }

    localStorage.setItem(SEARCH_STORAGE_KEY, trimmedSearchTerm);

    this.setState(
      {
        searchTerm: trimmedSearchTerm,
        lastSubmittedSearchTerm: trimmedSearchTerm,
      },
      () => this.props.onSearch(trimmedSearchTerm)
    );
  };

  render() {
    return (
      <section className="search-section">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            value={this.state.searchTerm}
            onChange={this.handleChange}
            placeholder="pikachu"
            className="search-input"
          />

          <button className="button" type="submit">
            Search
          </button>
        </form>
      </section>
    );
  }
}
