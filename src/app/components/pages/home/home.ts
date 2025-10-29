import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonFacade } from '../../../data-access/facades/pokemon.facade';
import { NumberInput } from '../../ui/number-input/number-input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, NumberInput],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly #pokemonFacade = inject(PokemonFacade);

  readonly pokemonPerPage = this.#pokemonFacade.pokemonPerPage;
  readonly activePage = this.#pokemonFacade.activePage;
  readonly totalPages = this.#pokemonFacade.totalPages;
  readonly loading = this.#pokemonFacade.loading;
  readonly error = this.#pokemonFacade.error;
  readonly pokemons = this.#pokemonFacade.pokemons;
  readonly totalPokemonCount = this.#pokemonFacade.totalPokemonCount;

  readonly searchTerm = signal('');
  readonly filteredPokemons = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.pokemons();
    }
    return this.pokemons().filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term),
    );
  });

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement | null;
    this.searchTerm.set(target?.value ?? '');
  }

  onPrevPage() {
    this.#pokemonFacade.loadPrevPage();
  }

  onNextPage() {
    this.#pokemonFacade.loadNextPage();
  }

  onPokemonPerPageChange(number: number) {
    this.#pokemonFacade.setPokemonPerPage(number);
  }
}
