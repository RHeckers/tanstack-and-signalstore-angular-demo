import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonTypeApiResponse } from '../../types/pokemon.types';

@Injectable({ providedIn: 'root' })
export class PokemonMetaService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'https://pokeapi.co/api/v2';

  loadPokemonTypes() {
    return this.#http.get<PokemonTypeApiResponse>(`${this.#apiUrl}/type`);
  }
}
