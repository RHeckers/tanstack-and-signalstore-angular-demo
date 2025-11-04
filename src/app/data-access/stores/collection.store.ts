import { signalStore, withState, withMethods } from '@ngrx/signals';

const initialState = {
  pokemon: [],
  berries: [],
  items: [],
};

export const CollectionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({})),
);
