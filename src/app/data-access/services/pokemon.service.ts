import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  combineLatest,
  count,
  firstValueFrom,
  forkJoin,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import {
  PokemonDetail,
  PokemonListApiResponse,
  PokemonDetailApiResponse,
  PokemonDetails,
} from '../../types/pokemon.types';
import { PokemonMapper } from '../../utils/pokemon-mapper';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'https://pokeapi.co/api/v2';

  async loadPokemons(page, limit): Promise<PokemonDetails> {
    const offset = (page - 1) * limit;
    return firstValueFrom(
      this.#http
        .get<PokemonListApiResponse>(`${this.#apiUrl}/pokemon`, {
          params: { limit, offset },
        })
        .pipe(
          switchMap((listResponse) =>
            forkJoin(
              listResponse.results.map((entry) =>
                this.#http.get<PokemonDetailApiResponse>(entry.url),
              ),
            ).pipe(
              map((details) => {
                return {
                  pokemon: signal(
                    details
                      .filter((detail: PokemonDetailApiResponse) => !!detail)
                      .map((detail) => PokemonMapper.mapDetail(detail)),
                  ),
                  totalPokemonCount: signal(listResponse.count),
                };
              }),
            ),
          ),
        ),
    );
  }

  async loadPokemon(name: string) {
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
