import { Signal } from '@angular/core';

export type PokemonSummary = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type PokemonDetail = PokemonSummary & {
  heightMeters: number;
  weightKilograms: number;
  abilities: string[];
  baseExperience: number;
  stats: Array<{ label: string; value: number }>;
};

export type PokemonDetails = {
  totalPokemonCount: Signal<number>;
  pokemon: Signal<PokemonDetail[]>;
};

export type PokemonListApiResponse = {
  count: number;
  results: Array<{ name: string; url: string }>;
};

export type PokemonDetailApiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: { front_default: string | null };
      dream_world?: { front_default: string | null };
    };
  };
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
};

export type PokemonTypeApiResponse = {
  count: number;
  results: Array<{ name: string; url: string }>;
};

export type PokemonQueryParamState = {
  activePage: number;
  pokemonPerPage: number;
  selectedType: string | null;
};

export type PokemonMetaState = {
  types: PokemonTypeApiResponse;
};
