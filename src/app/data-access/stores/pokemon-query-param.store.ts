import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withQPageParams } from './page-param-feature.store';
import { PokemonQueryParamState } from '../../types/query.types';

const initialState: PokemonQueryParamState = {
  selectedType: 'normal',
};

export const PokemonQueryParamStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQPageParams(),
  withMethods((store) => ({
    setSelectedType(type: string) {
      patchState(store, { selectedType: type });
    },
  })),
);
