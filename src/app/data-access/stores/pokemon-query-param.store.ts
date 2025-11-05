import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withPageQueryParamsFeature } from './page-param-feature.store';
import { PokemonQueryParamState } from '../../types/query.types';

const initialState: PokemonQueryParamState = {
  selectedType: 'normal',
};

export const PokemonQueryParamStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withPageQueryParamsFeature(),
  withMethods((store) => ({
    setSelectedType(type: string) {
      patchState(store, { selectedType: type });
    },
  })),
);
