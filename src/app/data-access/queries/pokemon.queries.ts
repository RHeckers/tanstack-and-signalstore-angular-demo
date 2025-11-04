import { computed, inject, Injectable } from '@angular/core';
import {
  injectQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { PokemonService } from '../services/pokemon.service';
import { PokemonQueryParamStore } from '../stores/pokemon-query-param.store';
import { injectQueries } from '@tanstack/angular-query-experimental/inject-queries-experimental';
import { ListApiResults } from '../../types/http.types';

@Injectable({ providedIn: 'root' })
export class PokemonQueries {
  readonly #pokemonService = inject(PokemonService);
  readonly #pokemonQueryStore = inject(PokemonQueryParamStore);

  readonly #movesFromTypeQuery = computed<ListApiResults[]>(
    () => this.typeDetailsQuery.data()?.moves ?? [],
  );

  readonly pokemonByType = computed(
    () => this.typeDetailsQuery.data()?.pokemon?.map((p) => p.pokemon) ?? [],
  );

  readonly #pagedPokemonsFromTypeQuery = computed<ListApiResults[]>(() => {
    const page = this.#pokemonQueryStore.activePage();
    const perPage = this.#pokemonQueryStore.itemsPerPage();
    const startIndex = (page - 1) * perPage;
    const pokemonsByType = this.pokemonByType();

    return pokemonsByType.slice(startIndex, startIndex + perPage);
  });

  readonly detailQueries = injectQueries(() => ({
    queries: this.#pagedPokemonsFromTypeQuery().map((pokemon) => ({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => this.#pokemonService.loadPokemon(pokemon.url),
      staleTime: 60_000,
    })),
  }));

  readonly moveDetailQueries = injectQueries(() => ({
    queries: this.#movesFromTypeQuery().map((move) => ({
      queryKey: ['move', move.name],
      queryFn: () => this.#pokemonService.loadMoveDetails(move.url),
      staleTime: 60_000,
    })),
  }));

  readonly typeDetailsQuery = injectQuery(() => ({
    enabled: this.#pokemonQueryStore.selectedType() !== null,
    queryKey: ['pokemon-by-type', this.#pokemonQueryStore.selectedType()],
    queryFn: () =>
      this.#pokemonService.loadPokemonsByType(
        this.#pokemonQueryStore.selectedType(),
      ),
    placeholderData: keepPreviousData,
  }));
}

// Temporary removed code:

// readonly #pokemonsFromListQuery = computed<ListApiResults[]>(
//   () => this.pokemonListDataQuery.data()?.results ?? [],
// );

// readonly #pokemonForDetailQuery = computed(() => this.#pokemonsFromTypeQuery());

// readonly pokemonListDataQuery = injectQuery(() => ({
//   queryKey: [
//     'pokemons',
//     this.#pokemonQueryStore.activePage(),
//     this.#pokemonQueryStore.itemsPerPage(),
//   ],
//   queryFn: () =>
//     this.#pokemonService.loadPokemonListData(
//       this.#pokemonQueryStore.activePage(),
//       this.#pokemonQueryStore.itemsPerPage(),
//     ),
//   placeholderData: keepPreviousData,
// }));
