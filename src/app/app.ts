import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonFacade } from './data-access/facades/pokemon.facade';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Mini Pokédex';
  protected readonly pokemonFacade = inject(PokemonFacade);
}
