import { Route } from '@angular/router';
import { PokemonQueryParamStore } from './data-access/stores/pokemon-query-param.store';
import { PokemonFacade } from './data-access/facades/pokemon.facade';
import { PokemonQueries } from './data-access/queries/pokemon.queries';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [PokemonFacade, PokemonQueryParamStore, PokemonQueries],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/pages/home/home').then((m) => m.Home),
        title: 'Mini Pokédex',
      },
      {
        path: 'moves',
        loadComponent: () =>
          import('./components/pages/moves/moves').then((m) => m.Moves),
        title: 'Type Moves',
      },
    ],
  },
  {
    path: 'overview-2',
    loadComponent: () =>
      import('./components/pages/home/home').then((m) => m.Home),
    title: 'Mini Pokédex',
    providers: [PokemonFacade, PokemonQueryParamStore, PokemonQueries],
  },
  {
    path: 'my-collection',
    loadComponent: () =>
      import('./components/pages/my-collection/my-collection').then(
        (m) => m.MyCollection,
      ),
    title: 'My Collection',
  },
  { path: '**', redirectTo: '' },
];
