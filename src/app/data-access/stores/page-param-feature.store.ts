import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';
import { QueryParamState } from '../../types/query.types';

const initialState: QueryParamState = {
  activePage: 1,
  itemsPerPage: 30,
};

export const withPageQueryParams = () =>
  signalStoreFeature(
    withState(initialState),
    withMethods((store) => ({
      setActivePage(page: number) {
        patchState(store, { activePage: page });
      },
      setItemsPerPage(count: number) {
        patchState(store, { itemsPerPage: count });
      },
    })),
  );
