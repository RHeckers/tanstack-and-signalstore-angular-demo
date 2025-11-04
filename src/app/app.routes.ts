import { Route } from '@angular/router';
import { Home } from './components/pages/home/home';
import { MyCollection } from './components/pages/my-collection/my-collection';
import { Moves } from './components/pages/moves/moves';

export const appRoutes: Route[] = [
  { path: '', component: Home, title: 'Mini Pokédex' },
  { path: 'moves', component: Moves, title: 'Type Moves' },
  { path: 'my-collection', component: MyCollection, title: 'My Collection' },
  { path: '**', redirectTo: '' },
];
