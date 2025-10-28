import { Route } from '@angular/router';
import { Home } from './components/home/home';

export const appRoutes: Route[] = [
  { path: '', component: Home, title: 'Mini Pokédex' },
  //   {
  //     path: 'pokemon/:name',
  //     title: 'Pokémon Details',
  //     loadComponent: () =>
  //       import('./components/pokemon-details').then((mod) => mod.PokemonDetails),
  //   },
  { path: '**', redirectTo: '' },
];
