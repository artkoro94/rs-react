import React from 'react';
import type { PokemonCardData } from '../../shared/api/pokemon-api';

interface PokemonCardProps {
  pokemon: PokemonCardData;
}

export class PokemonCard extends React.Component<PokemonCardProps> {
  render() {
    const { pokemon } = this.props;

    return (
      <article className="pokemon-card">
        <h3>{pokemon.name}</h3>
        <p>{pokemon.description}</p>
      </article>
    );
  }
}
