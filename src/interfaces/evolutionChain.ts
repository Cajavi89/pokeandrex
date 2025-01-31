import { Sprites } from './pokemon'

export interface Species {
  name: string;
  url: string;
}

export interface IItem {
  name: string | null
  url: string | null
}

export interface EvolutionDetail {
  gender: null;
  held_item: null;
  item: IItem
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: null;
  min_beauty: null;
  min_happiness: null;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: Species;
  turn_upside_down: boolean;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
}

export interface IEvolutionChain {
  baby_trigger_item: null;
  chain: Chain;
  id: number;
}

export interface IEvolutionSimpleInfo{
  name: string | null
  minLevel: string | number | null
  trigger:string | null
  item: IItem | null
}

export interface IAllEvolutionSimpleInfo{
  name:string | null
  trigger:string | null
  minLevel:string | null
  sprites:Sprites | null
  item: IItem | null
}
