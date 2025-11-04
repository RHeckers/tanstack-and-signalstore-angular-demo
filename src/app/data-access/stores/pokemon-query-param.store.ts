import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PokemonQueryParamState } from '../../types/pokemon.types';

const initialState: PokemonQueryParamState = {
  activePage: 1,
  pokemonPerPage: 30,
  selectedType: null,
};

export const PokemonQueryParamStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setActivePage(page: number) {
      patchState(store, { activePage: page });
    },
    setPokemonPerPage(count: number) {
      patchState(store, { pokemonPerPage: count });
    },
    setSelectedType(type: string) {
      patchState(store, { selectedType: type });
    },
  })),
);
