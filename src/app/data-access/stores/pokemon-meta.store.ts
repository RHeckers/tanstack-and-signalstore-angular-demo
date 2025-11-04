import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import {
  withCallState,
  setLoading,
  setLoaded,
  setError,
} from '@angular-architects/ngrx-toolkit';
import {
  PokemonMetaState,
  PokemonTypeApiResponse,
} from '../../types/pokemon.types';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { OperatorFunction, pipe, switchMap, tap } from 'rxjs';
import { PokemonMetaService } from '../services/pokemon-meta.service';

const initialState: PokemonMetaState = {
  types: { count: 0, results: [] },
};

export const PokemonMetaStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCallState({ collections: ['types'] }),
  withProps(() => ({
    _pokemonTypeService: inject(PokemonMetaService),
  })),
  withMethods((store) => ({
    loadTypes: rxMethod<void>(loadTypes(store, store._pokemonTypeService)),
  })),
  withHooks({
    onInit: (store) => {
      store.loadTypes();
    },
  }),
);

function loadTypes(
  store,
  service: PokemonMetaService,
): OperatorFunction<void, PokemonTypeApiResponse> {
  return pipe(
    tap(() => patchState(store, setLoading())),
    switchMap(() =>
      service.loadPokemonTypes().pipe(
        tapResponse({
          next: (types) => patchState(store, setLoaded(), { types }),
          error: (error) => patchState(store, setError(error)),
        }),
      ),
    ),
  );
}
