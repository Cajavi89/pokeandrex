import { apiAxios, apiPokemons, apiTypes } from 'src/boot/axios'
import { IGetMove } from 'src/interfaces/getMove'
import { IGetPokemon, IPokemonDetails, ITypeDamageRelation } from 'src/interfaces/getPokemonList'

/* eslint-disable semi */

/* eslint-disable quotes */
// export const POKEAPI_POKEMONS = "https://pokeapi.co/api/v2/pokemon";
// export const POKEAPI_TYPES = "https://pokeapi.co/api/v2/type";
export class PokemonsService {
  async getAllPokemons (quantity = 30, offset = 0): Promise<IGetPokemon> {
    const response = await apiPokemons.get(`?offset=${offset}&limit=${quantity}`);
    return response.data;
  }

  async getNextPokemon (url: string): Promise<IGetPokemon> {
    const response = await apiAxios.get(url)
    return response.data
  }

  async getOnePokemonDetails (id: string): Promise<IPokemonDetails> {
    const response = await apiPokemons.get(`/${id}`);
    return response.data;
  }

  async getMove (url: string):Promise<IGetMove> {
    const response = await apiAxios.get(url)
    return response.data
  }

  async getAllTypes () {
    const response = await apiTypes.get('');
    return response.data;
  }

  async getOneTypeDetails (id: string):Promise<ITypeDamageRelation> {
    const response = await apiTypes.get(`/${id}`);
    return response.data.damage_relations;
  }
}
