import {
  PokemonDetailApiResponse,
  PokemonDetail,
  PokemonSummary,
} from '../types/pokemon.types';

export class PokemonMapper {
  static mapDetail(api: PokemonDetailApiResponse): PokemonDetail {
    const image =
      api.sprites.other?.['official-artwork']?.front_default ??
      api.sprites.other?.dream_world?.front_default ??
      api.sprites.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${api.id}.png`;

    return {
      id: api.id,
      name: api.name,
      image,
      types: api.types.map((type) => type.type.name),
      abilities: api.abilities.map((entry) => entry.ability.name),
      baseExperience: api.base_experience,
      heightMeters: Number((api.height / 10).toFixed(1)),
      weightKilograms: Number((api.weight / 10).toFixed(1)),
      stats: api.stats.map((stat) => ({
        label: stat.stat.name,
        value: stat.base_stat,
      })),
      inCollection: api.inCollection ?? false,
    };
  }

  static toSummary(detail: PokemonDetail): PokemonSummary {
    return {
      id: detail.id,
      name: detail.name,
      image: detail.image,
      types: detail.types,
    };
  }
}
