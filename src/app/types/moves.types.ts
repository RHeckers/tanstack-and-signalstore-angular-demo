import { ListApiResults } from './http.types';

export type PokemonMoveDetailApiResponse = {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  contest_combos: {
    normal: MoveContestComboDetail | null;
    super: MoveContestComboDetail | null;
  } | null;
  contest_effect: { url: string } | null;
  contest_type: ListApiResults | null;
  damage_class: ListApiResults;
  effect_entries: MoveEffectEntry[];
  effect_changes: MoveEffectChange[];
  flavor_text_entries: MoveFlavorTextEntry[];
  generation: ListApiResults;
  machines: MoveMachineVersionDetail[];
  meta: MoveMetaData | null;
  names: MoveName[];
  past_values: MovePastValue[];
  stat_changes: MoveStatChange[];
  super_contest_effect: { url: string } | null;
  target: ListApiResults;
  type: ListApiResults | null;
  learned_by_pokemon: ListApiResults[];
};

export type MoveContestComboDetail = {
  use_before: ListApiResults[] | null;
  use_after: ListApiResults[] | null;
};

export type MoveEffectEntry = {
  effect: string;
  short_effect: string;
  language: ListApiResults;
};

export type MoveEffectChange = {
  effect_entries: Array<{
    effect: string;
    language: ListApiResults;
  }>;
  version_group: ListApiResults;
};

export type MoveFlavorTextEntry = {
  flavor_text: string;
  language: ListApiResults;
  version_group: ListApiResults;
};

export type MoveMachineVersionDetail = {
  machine: { url: string };
  version_group: ListApiResults;
};

export type MoveMetaData = {
  ailment: ListApiResults;
  ailment_chance: number;
  category: ListApiResults;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: number | null;
  max_turns: number | null;
  min_hits: number | null;
  min_turns: number | null;
  stat_chance: number;
};

export type MoveName = {
  name: string;
  language: ListApiResults;
};

export type MovePastValue = {
  accuracy: number | null;
  effect_chance: number | null;
  power: number | null;
  pp: number | null;
  effect_entries: MoveEffectEntry[];
  type: ListApiResults | null;
  version_group: ListApiResults;
};

export type MoveStatChange = {
  change: number;
  stat: ListApiResults;
};
