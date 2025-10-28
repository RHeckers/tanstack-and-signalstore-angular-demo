import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonFacade } from '../../data-access/facades/pokemon.facade';
import { NumberInput } from '../UI/number-input/number-input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, NumberInput],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly #facade = inject(PokemonFacade);

  readonly pokemonPerPage = this.#facade.pokemonPerPage;
  readonly activePage = this.#facade.activePage;
  readonly totalPages = this.#facade.totalPages;
  readonly loading = this.#facade.loading;
  readonly error = this.#facade.error;
  readonly pokemons = this.#facade.pokemons;
  readonly totalPokemonCount = this.#facade.totalPokemonCount;

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
    this.#facade.loadPrevPage();
  }

  onNextPage() {
    this.#facade.loadNextPage();
  }

  onPokemonPerPageChange(number: number) {
    this.#facade.setPokemonPerPage(number);
  }
}
