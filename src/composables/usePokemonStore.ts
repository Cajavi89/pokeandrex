import { defineStore } from 'pinia'
import { IGetPokemonList, IPokemonDetails } from 'src/interfaces/getPokemonList'
import { ref } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<IPokemonDetails[]>([]) // Lista de Pokémon
  const loading = ref(false) // Estado de carga
  const error = ref<any>(null) // Manejo de errores

  // Función para obtener los primeros 150 Pokémon
  const fetchPokemon = async () => {
    loading.value = true
    error.value = null

    try {
      // Verificar si los datos están en cache
      // const cachedData = localStorage.getItem('pokemonCache')
      // if (cachedData) {
      // Si hay datos en cache, usarlos
      // pokemonList.value = JSON.parse(cachedData)
      // } else {
      // Si no hay datos en cache, hacer la solicitud a la API
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
      if (!response.ok) throw new Error('Error al obtener los Pokémon')
      const data: IGetPokemonList = await response.json()

      // Obtener los detalles de cada Pokémon
      const pokemonDetails = await Promise.all(
        data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
      )

      // Guardar los datos en cache
      // localStorage.setItem('pokemonCache', JSON.stringify(pokemonDetails))
      pokemonList.value = pokemonDetails
      // }
    } catch (err) {
      if (err instanceof Error) error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    pokemonList, // Lista de Pokémon
    loading, // Estado de carga
    error, // Error (si lo hay)
    fetchPokemon // Función para obtener los Pokémon
  }
})
