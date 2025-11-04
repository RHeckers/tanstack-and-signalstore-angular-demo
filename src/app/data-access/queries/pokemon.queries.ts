import { computed, inject, Injectable } from '@angular/core';
import {
  injectQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { PokemonService } from '../services/pokemon.service';
import { PokemonQueryParamStore } from '../stores/pokemon-query-param.store';
import { injectQueries } from '@tanstack/angular-query-experimental/inject-queries-experimental';

@Injectable({ providedIn: 'root' })
export class PokemonQueries {
  readonly #pokemonService = inject(PokemonService);
  readonly #pokemonStore = inject(PokemonQueryParamStore);

  readonly #pokemonsFromListQuery = computed(
    () => this.pokemonListDataQuery.data()?.results ?? [],
  );

  readonly #pokemonsFromTypeQuery = computed(
    () => this.pokemonByTypeQuery.data()?.pokemon ?? [],
  );

  readonly #pokemonForDetailQuery = computed(() =>
    this.#pokemonsFromTypeQuery().length > 0
      ? this.#pokemonsFromTypeQuery().map((p) => p.pokemon)
      : this.#pokemonsFromListQuery(),
  );

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

  readonly detailQueries = injectQueries(() => ({
    queries: this.#pokemonForDetailQuery().map((item) => ({
      queryKey: ['pokemon', item.name],
      queryFn: () => this.#pokemonService.loadPokemon(item.url),
      staleTime: 60_000,
    })),
  }));

  readonly pokemonByTypeQuery = injectQuery(() => ({
    enabled: this.#pokemonStore.selectedType() !== null,
    queryKey: ['pokemon-by-type', this.#pokemonStore.selectedType()],
    queryFn: () =>
      this.#pokemonService.loadPokemonsByType(
        this.#pokemonStore.selectedType(),
      ),
    placeholderData: keepPreviousData,
  }));
}
