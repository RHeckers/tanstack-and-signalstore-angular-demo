import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonFacade } from '../../../data-access/facades/pokemon.facade';
import { NumberInput } from '../../ui/number-input/number-input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, NumberInput, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly #pokemonFacade = inject(PokemonFacade);

  readonly seachByType = signal(false);

  readonly pokemonPerPage = this.#pokemonFacade.pokemonPerPage;
  readonly activePage = this.#pokemonFacade.activePage;
  readonly totalPages = this.#pokemonFacade.totalPages;
  readonly loading = this.#pokemonFacade.pokemonDetailsListLoading;
  readonly error = this.#pokemonFacade.pokemonDetailsListError;
  readonly pokemons = this.#pokemonFacade.pokemonDetailsList;
  readonly totalPokemonCount = this.#pokemonFacade.totalPokemonCount;
  readonly types = this.#pokemonFacade.pokemonTypes;
  readonly activeType = this.#pokemonFacade.activeType;

  onPrevPage() {
    this.#pokemonFacade.loadPrevPage();
  }

  onNextPage() {
    this.#pokemonFacade.loadNextPage();
  }

  onPokemonPerPageChange(number: number) {
    this.#pokemonFacade.setPokemonPerPage(number);
  }

  onTypeFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.#pokemonFacade.setSelectedType(value);
  }

  onSearchByTypeToggle() {
    this.seachByType.update((current) => !current);

    if (!this.seachByType()) {
      this.#pokemonFacade.setSelectedType('');
      return;
    }

    this.#pokemonFacade.setSelectedType(this.types()[0]);
  }
}
