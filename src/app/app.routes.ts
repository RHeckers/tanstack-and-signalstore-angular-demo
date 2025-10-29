import { Route } from '@angular/router';
import { Home } from './components/pages/home/home';

export const appRoutes: Route[] = [
  { path: '', component: Home, title: 'Mini Pokédex' },
  { path: '**', redirectTo: '' },
];
