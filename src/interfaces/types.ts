export enum titlesDamageInfo {
  double_damage_from = "Recibe daño doble de:",
  double_damage_to = "Hace doble daño a: ",
  half_damage_from = "Recibe mitad de daño de: ",
  half_damage_to = "Hace mitad de daño a: ",
  no_damage_from = "Inmune",
  no_damage_to = "No hace daño a: ",
}

export enum ETypes {
  NORMAL = "Normal",
  FIRE = "Fuego",
  WATER = "Agua",
  ELECTRIC = "Eléctrico",
  GRASS = "Planta",
  ICE = "Hielo",
  FIGHTING = "Lucha",
  POISON = "Veneno",
  GROUND = "Tierra",
  FLYING = "Volador",
  PSYCHIC = "Psíquico",
  BUG = "Bicho",
  ROCK = "Roca",
  GHOST = "Fantasma",
  DRAGON = "Dragón",
  DARK = "Siniestro",
  STEEL = "Acero",
  FAIRY = "Hada",
}

export interface Generation {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  generation: Generation;
}

export interface Name {
  name: string;
  language: Generation;
}

export interface Pokemon {
  slot: number;
  pokemon: Generation;
}
export interface DamageRelations {
  no_damage_to: Generation[];
  half_damage_to: Generation[];
  double_damage_to: Generation[];
  no_damage_from: Generation[];
  half_damage_from: Generation[];
  double_damage_from: Generation[];
}
export interface PastDamageRelation {
  generation: Generation;
  damage_relations: DamageRelations;
}
export interface Welcome {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  past_damage_relations: PastDamageRelation[];
  game_indices: GameIndex[];
  generation: Generation;
  move_damage_class: Generation;
  names: Name[];
  pokemon: Pokemon[];
  moves: Generation[];
}
