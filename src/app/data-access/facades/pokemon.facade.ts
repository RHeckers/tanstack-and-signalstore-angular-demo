import { computed, inject, Injectable } from '@angular/core';
import { PokemonQueries } from '../queries/pokemon.queries';
import { PokemonQueryParamStore } from '../stores/pokemon-query-param.store';
import { PokemonMapper } from '../../utils/pokemon-mapper';
import { PokemonMetaStore } from '../stores/pokemon-meta.store';
import { PokemonMoveDetailApiResponse } from '../../types/moves.types';

@Injectable({ providedIn: 'root' })
export class PokemonFacade {
  readonly #queries = inject(PokemonQueries);
  readonly #pokemonQueryParamStore = inject(PokemonQueryParamStore);
  readonly #pokemonMetaStore = inject(PokemonMetaStore);

  readonly activePage = this.#pokemonQueryParamStore.activePage;
  readonly pokemonPerPage = this.#pokemonQueryParamStore.itemsPerPage;
  readonly activeType = this.#pokemonQueryParamStore.selectedType;
  readonly pokemonTypesLoading = this.#pokemonMetaStore.typesLoading;

  readonly pokemonTypes = computed(() =>
    this.#pokemonMetaStore.types.results().map((t) => t.name),
  );

  readonly hasSelectedType = computed(() => {
    const type = this.#pokemonQueryParamStore.selectedType();
    return !!type && type.trim().length > 0;
  });

  readonly pokemonDetailsList = computed(() => {
    if (this.loadingOrErrorOnDetails()) return [];

    return this.#queries
      .detailQueries()
      .map((r) => r.data())
      .filter(Boolean)
      .map(PokemonMapper.mapDetail);
  });

  readonly loadingOrErrorOnDetails = computed(
    () => this.pokemonDetailsListLoading() || this.pokemonDetailsListError(),
  );

  readonly pokemonDetailsListLoading = computed(() =>
    this.#queries.detailQueries().some((q) => q.isLoading()),
  );

  readonly pokemonDetailsListError = computed(() =>
    this.#queries
      .detailQueries()
      .find((q) => q.error())
      ?.error(),
  );

  readonly totalPokemonCount = computed(() => {
    return this.#pokemonQueryParamStore.selectedType()
      ? this.pokemonDetailsList().length
      : (this.#queries.pokemonListDataQuery.data()?.count ?? 0);
  });

  readonly totalPages = computed(() =>
    Math.ceil(
      this.totalPokemonCount() / this.#pokemonQueryParamStore.itemsPerPage(),
    ),
  );

  readonly moveDetailsListLoading = computed(() =>
    this.#queries.moveDetailQueries().some((query) => query.isLoading()),
  );

  readonly moveDetailsListError = computed(() =>
    this.#queries
      .moveDetailQueries()
      .find((query) => query.error())
      ?.error(),
  );

  readonly moveDetailsList = computed<PokemonMoveDetailApiResponse[]>(() => {
    if (!this.hasSelectedType()) {
      return [];
    }

    if (this.moveDetailsListLoading() || this.moveDetailsListError()) {
      return [];
    }

    return this.#queries
      .moveDetailQueries()
      .map((query) => query.data())
      .filter((move): move is PokemonMoveDetailApiResponse => !!move);
  });

  setActivePage(page: number) {
    this.#pokemonQueryParamStore.setActivePage(page);
  }

  setPokemonPerPage(count: number) {
    this.#pokemonQueryParamStore.setItemsPerPage(count);
  }

  setSelectedType(type: string) {
    this.#pokemonQueryParamStore.setSelectedType(type);
  }

  loadNextPage() {
    const nextPage = Math.min(
      this.#pokemonQueryParamStore.activePage() + 1,
      this.totalPages(),
    );
    this.setActivePage(nextPage);
  }

  loadPrevPage() {
    const prevPage = Math.max(this.#pokemonQueryParamStore.activePage() - 1, 1);
    this.setActivePage(prevPage);
  }

  loadPokemonTypes() {
    this.#pokemonMetaStore.loadTypes();
  }
}
