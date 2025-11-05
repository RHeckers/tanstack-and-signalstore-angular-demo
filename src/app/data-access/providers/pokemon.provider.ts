import { PokemonFacade } from '../facades/pokemon.facade';
import { PokemonQueries } from '../queries/pokemon.queries';
import { PokemonQueryParamStore } from '../stores/pokemon-query-param.store';

export const providePokemon = () => {
  return [PokemonFacade, PokemonQueryParamStore, PokemonQueries];
};
