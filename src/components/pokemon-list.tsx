import React from 'react';
import type { PokemonCardData } from '../shared/api/pokemon-api';
import { PokemonCard } from './pokemon-card';

interface PokemonListProps {
  pokemons: PokemonCardData[];
}

export class PokemonList extends React.Component<PokemonListProps> {
  render() {
    return (
      <div className="pokemon-list">
        {this.props.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}