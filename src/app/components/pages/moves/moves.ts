import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { PokemonFacade } from '../../../data-access/facades/pokemon.facade';
import { PokemonMoveDetailApiResponse } from '../../../types/moves.types';

@Component({
  selector: 'app-moves',
  imports: [TitleCasePipe],
  templateUrl: './moves.html',
  styleUrl: './moves.scss',
})
export class Moves {
  readonly #pokemonFacade = inject(PokemonFacade);

  protected readonly moves = this.#pokemonFacade.moveDetailsList;
  protected readonly loading = this.#pokemonFacade.moveDetailsListLoading;
  protected readonly error = this.#pokemonFacade.moveDetailsListError;
  protected readonly selectedType = this.#pokemonFacade.activeType;

  protected moveEffect(move: PokemonMoveDetailApiResponse) {
    const entry = move.effect_entries.find(
      (effect) => effect.language.name === 'en',
    );

    if (!entry) {
      return 'Effect description unavailable.';
    }

    return (
      entry.short_effect || entry.effect || 'Effect description unavailable.'
    );
  }
}
