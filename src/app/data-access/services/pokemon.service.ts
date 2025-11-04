import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  PokemonListApiResponse,
  PokemonDetailApiResponse,
} from '../../types/pokemon.types';
import { HtppQueryParams } from '../../types/http.types';
import { PokemonMoveDetailApiResponse } from '../../types/moves.types';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'https://pokeapi.co/api/v2';

  async loadPokemonListData(
    page: number,
    limit: number,
  ): Promise<PokemonListApiResponse> {
    const offset = (page - 1) * limit;
    return this.getAsPromise<PokemonListApiResponse>(
      `${this.#apiUrl}/pokemon`,
      {
        limit,
        offset,
      },
    );
  }

  async loadPokemon(url: string) {
    return this.getAsPromise<PokemonDetailApiResponse>(url);
  }

  async loadMoveDetails(url: string) {
    return this.getAsPromise<PokemonMoveDetailApiResponse>(url);
  }

  async loadPokemonByName(name: string) {
    return this.getAsPromise<PokemonDetailApiResponse>(
      `${this.#apiUrl}/pokemon/${this.normaliseName(name)}`,
    );
  }

  async loadPokemonsByType(type: string) {
    return this.getAsPromise<any>(`${this.#apiUrl}/type/${type}`);
  }

  private normaliseName(name: string) {
    return name.trim().toLowerCase();
  }

  private getAsPromise<T>(url: string, params?: HtppQueryParams) {
    return firstValueFrom(this.#http.get<T>(url, { params }));
  }
}
