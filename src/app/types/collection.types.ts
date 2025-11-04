import { PokemonDetail } from './pokemon.types';

export type CollectionState = {
  pokemons: PokemonDetail[];
  addToCollection: boolean;
};
