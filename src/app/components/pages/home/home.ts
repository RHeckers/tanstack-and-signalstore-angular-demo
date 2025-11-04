import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonFacade } from '../../../data-access/facades/pokemon.facade';
import { NumberInput } from '../../ui/number-input/number-input';
import { FormsModule } from '@angular/forms';
import { PokemonDetail } from '../../../types/pokemon.types';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TitleCasePipe, NumberInput, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly #pokemonFacade = inject(PokemonFacade);

  readonly routeTitle = inject(ActivatedRoute).snapshot.title;

  readonly addToCollection = this.#pokemonFacade.canAddToCollection;
  readonly activePage = this.#pokemonFacade.activePage;
  readonly activeType = this.#pokemonFacade.activeType;
  readonly error = this.#pokemonFacade.pokemonDetailsListError;
  readonly loading = this.#pokemonFacade.pokemonDetailsListLoading;
  readonly pokemons = this.#pokemonFacade.pokemonDetailsList;
  readonly pokemonPerPage = this.#pokemonFacade.pokemonPerPage;
  readonly totalPages = this.#pokemonFacade.totalPages;
  readonly totalPokemonCount = this.#pokemonFacade.totalPokemonCount;
  readonly types = this.#pokemonFacade.pokemonTypes;

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

  onAddToCollection(pokemon: PokemonDetail) {
    pokemon.inCollection = true;
    this.#pokemonFacade.addToCollection(pokemon);
  }
}
