import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { PokemonFacade } from '../../../data-access/facades/pokemon.facade';

@Component({
  selector: 'app-my-collection',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './my-collection.html',
  styleUrl: './my-collection.scss',
})
export class MyCollection {
  readonly #pokemonFacade = inject(PokemonFacade);

  readonly collection = this.#pokemonFacade.collection;
  readonly collectionCount = this.#pokemonFacade.collectionCount;
  readonly hasCollection = computed(() => this.collectionCount() > 0);
}
