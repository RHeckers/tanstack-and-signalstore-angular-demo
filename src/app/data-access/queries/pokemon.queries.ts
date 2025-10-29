import { computed, inject, Injectable } from '@angular/core';
import {
  injectQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { PokemonService } from '../services/pokemon.service';
import { PokemonStore } from '../stores/pokemon.store';
import { injectQueries } from '@tanstack/angular-query-experimental/inject-queries-experimental';
import { PokemonMapper } from '../../utils/pokemon-mapper';

@Injectable({ providedIn: 'root' })
export class PokemonQueries {
  readonly #pokemonService = inject(PokemonService);
  readonly #pokemonStore = inject(PokemonStore);

  readonly pokemonListDataQuery = injectQuery(() => ({
    queryKey: [
      'pokemons',
      this.#pokemonStore.activePage(),
      this.#pokemonStore.pokemonPerPage(),
    ],
    queryFn: () =>
      this.#pokemonService.loadPokemonListData(
        this.#pokemonStore.activePage(),
        this.#pokemonStore.pokemonPerPage(),
      ),
    placeholderData: keepPreviousData,
  }));

  detailQueries = injectQueries(() => {
    const items = this.pokemonListDataQuery.data()?.results ?? [];
    return {
      queries: items.map((item) => ({
        queryKey: ['pokemon', item.name],
        queryFn: () => this.#pokemonService.loadPokemon(item.url),
        staleTime: 60_000,
      })),
    };
  });

  details = computed(() =>
    this.detailQueries()
      .map((r) => r.data())
      .filter(Boolean)
      .map(PokemonMapper.mapDetail),
  );
}
