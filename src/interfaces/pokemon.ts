export interface Species {
  name: string;
  url: string;
}

export interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: Species;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface VersionDetail {
  rarity: number;
  version: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface PastType {
  generation: Species;
  types: Type[];
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: any;
  versions?: any;
  animated?: Sprites;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface IPokemonWelcome {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Species[];
  game_indices: GameIndex[];
  held_items: any[];
  location_area_encounters: string;
  moves: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
}
