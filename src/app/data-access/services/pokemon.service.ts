import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  PokemonListApiResponse,
  PokemonDetailApiResponse,
} from '../../types/pokemon.types';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'https://pokeapi.co/api/v2';

  async loadPokemonListData(page, limit): Promise<PokemonListApiResponse> {
    const offset = (page - 1) * limit;
    return firstValueFrom(
      this.#http.get<PokemonListApiResponse>(`${this.#apiUrl}/pokemon`, {
        params: { limit, offset },
      }),
    );
  }

  async loadPokemon(url: string) {
    return firstValueFrom(this.#http.get<PokemonDetailApiResponse>(url));
  }

  async loadPokemonByName(name: string) {
    const normalised = this.normaliseName(name);

    return firstValueFrom(
      this.#http.get<PokemonDetailApiResponse>(
        `${this.#apiUrl}/pokemon/${normalised}`,
      ),
    );
  }

  private normaliseName(name: string) {
    return name.trim().toLowerCase();
  }
}
