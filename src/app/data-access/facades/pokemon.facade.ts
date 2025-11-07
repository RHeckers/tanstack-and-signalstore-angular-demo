import { computed, inject, Injectable } from '@angular/core';
import { PokemonQueries } from '../queries/pokemon.queries';
import { PokemonQueryParamStore } from '../stores/pokemon-query-param.store';
import { PokemonMapper } from '../../utils/pokemon-mapper';
import { PokemonMetaStore } from '../stores/pokemon-meta.store';
import { PokemonMoveDetailApiResponse } from '../../types/moves.types';
import { CollectionStore } from '../stores/collection.store';
import { PokemonDetail } from '../../types/pokemon.types';

@Injectable({ providedIn: 'root' })
export class PokemonFacade {
  readonly #queries = inject(PokemonQueries);
  readonly #pokemonQueryParamStore = inject(PokemonQueryParamStore);
  readonly #pokemonMetaStore = inject(PokemonMetaStore);
  readonly #pokemonCollectionStore = inject(CollectionStore);

  readonly activePage = this.#pokemonQueryParamStore.activePage;
  readonly pokemonPerPage = this.#pokemonQueryParamStore.itemsPerPage;
  readonly activeType = this.#pokemonQueryParamStore.selectedType;
  readonly pokemonTypesLoading = this.#pokemonMetaStore.typesLoading;
  readonly collection = this.#pokemonCollectionStore.pokemons;
  readonly canAddToCollection = this.#pokemonCollectionStore.addToCollection;

  readonly collectionCount = computed(() => this.collection().length);

  readonly pokemonTypes = computed(() =>
    this.#pokemonMetaStore.types.results().map((t) => t.name),
  );

  readonly pokemonDetailsList = computed(() => {
    if (this.loadingOrErrorOnDetails()) return [];

    return this.#queries
      .pokemonDetailQueries()
      .map((r) => {
        const data = r.data();
        if (!data) return null;

        data.inCollection = this.collection().some((p) => p.id === data.id);

        return data;
      })
      .filter(Boolean)
      .map(PokemonMapper.mapDetail);
  });

  readonly loadingOrErrorOnDetails = computed(
    () => this.pokemonDetailsListLoading() || this.pokemonDetailsListError(),
  );

  readonly pokemonDetailsListLoading = computed(() =>
    this.#queries.pokemonDetailQueries().some((q) => q.isLoading()),
  );

  readonly pokemonDetailsListError = computed(() =>
    this.#queries
      .pokemonDetailQueries()
      .find((q) => q.error())
      ?.error(),
  );

  readonly totalPokemonCount = computed(
    () => this.#queries.pokemonByType().length ?? 0,
  );

  readonly totalPages = computed(() => {
    return Math.ceil(
      this.totalPokemonCount() / this.#pokemonQueryParamStore.itemsPerPage(),
    );
  });

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
    const totalPages = Math.ceil(this.totalPokemonCount() / count);
    if (this.#pokemonQueryParamStore.activePage() > totalPages) {
      this.setActivePage(totalPages);
    }

    this.#pokemonQueryParamStore.setItemsPerPage(count);
  }

  setSelectedType(type: string) {
    this.setActivePage(1);
    this.#pokemonQueryParamStore.setSelectedType(type);
  }

  addToCollection(pokemon: PokemonDetail) {
    this.#pokemonCollectionStore.addPokemonToCollection(pokemon);
  }

  setAddToCollection(add: boolean) {
    this.#pokemonCollectionStore.setAddToCollection(add);
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
