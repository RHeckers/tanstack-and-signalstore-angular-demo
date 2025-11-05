import { Route } from '@angular/router';
import { providePokemon } from './data-access/providers/pokemon.provider';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [providePokemon()],
    // loadComponent: () =>
    //   import('./components/pages/home-moves-wrapper/home-moves-wrapper').then(
    //     (m) => m.HomeMovesWrapper,
    //   ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/pages/home/home').then((m) => m.Home),
        title: 'Pokedex overview 1',
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
    title: 'Pokedex overview 2',
    providers: [providePokemon()],
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
