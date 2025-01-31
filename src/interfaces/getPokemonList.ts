export interface IPokemonData {
  name: string
  url: string
}

export interface IAbilities{
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface IForms{
  name: string
  url: string
}

export interface IMoves{
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]
}

export interface ISprites{
  back_default: string
  back_female: string | null
  back_shiny: string
  back_shiny_female: string | null
  front_default: string
  front_female: string | null
  front_shiny: string
  front_shiny_female: string | null
  other: {
    dream_world: {
      front_default: string
      front_female: string | null
    }
    'official-artwork': {
      front_default: string
    }
    home:{
      front_default: string
      front_female: string | null
      front_shiny: string
      front_shiny_female: string | null
    }
    showdown:{
      back_default: string
      back_female: string | null
      back_shiny: string
      back_shiny_female: string | null
      front_default: string
      front_female: string | null
      front_shiny: string
      front_shiny_female: string | null
    }
  }
}

export interface IStats{
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface ITypes{
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface IHeldItems{
  item: {
    name: string
    url: string
  }
  version_details: {
    rarity: number
    version: {
      name: string
      url: string
    }
  }[]
}

export interface IPokemonInitialInfo{
  name: string
  id: number
  sprite: string
  type: string
}

export interface ISPecies{
  name: string,
  url: string
}

export interface IPokemonDetails{
  abilities: IAbilities[]
  base_experience: number
  forms: IForms[]
  height: number
  held_items: IHeldItems[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: IMoves[]
  name: string
  order: number
  sprites: ISprites
  stats: IStats[]
  species:ISPecies
  types: ITypes[]
  weight: number
}

export interface IGetPokemon{
  count: number
  next: string | null
  previous: string | null
  results: IPokemonDetails[]
}

// **********************************************************

interface IDoubleDamageFrom{
  name: string
  url: string
}
interface IDoubleDamageTo{
  name: string
  url: string
}
interface IHalfDamageFrom{
  name: string
  url: string
}
interface IHalfDamageTo{
  name: string
  url: string
}
interface INoDamageFrom{
  name: string
  url: string
}
interface INoDamageTo{
  name: string
  url: string
}
export interface ITypeDamageRelation{
  double_damage_from:IDoubleDamageFrom[]
  double_damage_to: IDoubleDamageTo[]
  half_damage_from: IHalfDamageFrom[]
  half_damage_to: IHalfDamageTo[]
  no_damage_from: INoDamageFrom[]
  no_damage_to: INoDamageTo[]
}
