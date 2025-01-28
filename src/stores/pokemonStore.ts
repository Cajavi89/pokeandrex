import { defineStore } from 'pinia'
import { IPokemonInitialInfo } from 'src/interfaces/getPokemonList'
import { ref } from 'vue'

export const usePokemonsStore = defineStore('pokemons', () => {
  // states
  const pokemonList = ref<IPokemonInitialInfo[]>([]) // Lista de Pokémon
  const count = ref(0) // Cantidad de Pokémon
  const next = ref('') // Siguiente página
  const previous = ref('') // Página anterior
  const error = ref<any>(null) // Manejo de errores

  const storedPokemonList = localStorage.getItem('pokemonList')
  if (storedPokemonList) pokemonList.value = JSON.parse(storedPokemonList)

  return {
    // states
    pokemonList,
    count,
    next,
    previous,
    error,
    // Setters
    // Actions
    setPokemons (data : IPokemonInitialInfo[]) {
      pokemonList.value = data
    },
    setCount (data : number) {
      count.value = data
    },
    setNext (data : string | null) {
      if (data !== null) next.value = data
    },
    setPrevious (data : string | null) {
      if (data !== null) previous.value = data
    }
  }
})
