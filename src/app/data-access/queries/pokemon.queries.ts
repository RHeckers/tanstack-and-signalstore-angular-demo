import { inject, Injectable } from '@angular/core';
import {
  injectQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { PokemonService } from '../services/pokemon.service';
import { PokemonStore } from '../stores/pokemon.store';

@Injectable({ providedIn: 'root' })
export class PokemonQueries {
  readonly #pokemonService = inject(PokemonService);
  readonly #pokemonStore = inject(PokemonStore);

  readonly pokemonListQuery = injectQuery(() => ({
    queryKey: [
      'pokemons',
      this.#pokemonStore.activePage(),
      this.#pokemonStore.pokemonPerPage(),
    ],
    queryFn: () =>
      this.#pokemonService.loadPokemons(
        this.#pokemonStore.activePage(),
        this.#pokemonStore.pokemonPerPage(),
      ),
    placeholderData: keepPreviousData,
  }));
}
