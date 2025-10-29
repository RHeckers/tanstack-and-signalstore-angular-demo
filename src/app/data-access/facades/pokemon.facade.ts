import { computed, inject, Injectable } from '@angular/core';
import { PokemonQueries } from '../queries/pokemon.queries';
import { PokemonStore } from '../stores/pokemon.store';

@Injectable({ providedIn: 'root' })
export class PokemonFacade {
  readonly #queries = inject(PokemonQueries);
  readonly #store = inject(PokemonStore);

  readonly pokemonPerPage = this.#store.pokemonPerPage;
  readonly activePage = this.#store.activePage;

  readonly pokemons = this.#queries.details;
  readonly loading = computed(() =>
    this.#queries.detailQueries().some((q) => q.isLoading),
  );
  readonly error = computed(() =>
    this.#queries
      .detailQueries()
      .find((q) => q.error)
      ?.error(),
  );

  readonly totalPokemonCount = computed(() => {
    return this.#queries.pokemonListDataQuery.data()?.count ?? 0;
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.totalPokemonCount() / this.#store.pokemonPerPage()),
  );

  setActivePage(page: number) {
    this.#store.setActivePage(page);
  }

  setPokemonPerPage(count: number) {
    this.#store.setPokemonPerPage(count);
  }

  loadNextPage() {
    const nextPage = Math.min(this.#store.activePage() + 1, this.totalPages());
    this.setActivePage(nextPage);
  }

  loadPrevPage() {
    const prevPage = Math.max(this.#store.activePage() - 1, 1);
    this.setActivePage(prevPage);
  }
}
