import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PokemonState } from '../../types/pokemon.types';

const initialState: PokemonState = {
  activePage: 1,
  pokemonPerPage: 30,
};

export const PokemonStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setActivePage(page: number) {
      patchState(store, { activePage: page });
    },
    setPokemonPerPage(count: number) {
      patchState(store, { pokemonPerPage: count });
    },
  })),
);
