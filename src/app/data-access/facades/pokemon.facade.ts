import { computed, inject, Injectable } from '@angular/core';
import { PokemonQueries } from '../queries/pokemon.queries';
import { PokemonStore } from '../stores/pokemon.store';

@Injectable({ providedIn: 'root' })
export class PokemonFacade {
  readonly #queries = inject(PokemonQueries);
  readonly #store = inject(PokemonStore);

  readonly pokemonPerPage = this.#store.pokemonPerPage;
  readonly activePage = this.#store.activePage;
  readonly loading = this.#queries.pokemonListQuery.isLoading;
  readonly error = this.#queries.pokemonListQuery.error;
  readonly hasLoadedList = this.#queries.pokemonListQuery.isSuccess;

  readonly pokemons = computed(
    () => this.#queries.pokemonListQuery.data()?.pokemon() || [],
  );

  readonly totalPokemonCount = computed(() => {
    return this.#queries.pokemonListQuery.data()?.totalPokemonCount() || 0;
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.totalPokemonCount() / this.#store.pokemonPerPage()),
  );

  loadPokemons() {
    this.#queries.pokemonListQuery.refetch();
  }

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
