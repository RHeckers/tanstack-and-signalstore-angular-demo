import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { CollectionState } from '../../types/collection.types';
import { PokemonDetail } from '../../types/pokemon.types';

const initialState: CollectionState = {
  pokemons: [],
  addToCollection: false,
};

export const CollectionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addPokemonToCollection(pokemon: PokemonDetail) {
      patchState(store, { pokemons: [...store.pokemons(), pokemon] });
    },
    setAddToCollection(add: boolean) {
      patchState(store, { addToCollection: add });
    },
  })),
);
