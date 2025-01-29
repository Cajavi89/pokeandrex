import { ref } from 'vue'
import { PokemonsService } from 'src/api/pokeapi'
// import { IPokemonDetails } from 'src/interfaces/getPokemonList'
import { usePokemonsStore } from 'src/stores/pokemonStore'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

export const usePokemons = () => {
  const pokemonService = new PokemonsService()
  // const pokemonsList = ref<IPokemonDetails[]>([]) // Estado reactivo para la lista de Pokémon
  const loading = ref(true) // Estado reactivo para el estado de carga
  // const error = ref<Error | null>(null) // Estado reactivo para manejar errores
  const isPokemonStored = ref<boolean>()

  const q = useQuasar()

  const pokemonsStore = usePokemonsStore()
  const { count, error, next, pokemonList, previous, auxiliarPokemonList } = storeToRefs(pokemonsStore)

  // Función asíncrona para cargar los datos
  const loadPokemons = async () => {
    try {
      const storedPokemons = localStorage.getItem('pokemonList')
      isPokemonStored.value = !!storedPokemons
      if (!isPokemonStored.value) {
        const pokemons = await pokemonService.getAllPokemons()
        const details = await Promise.all(
          pokemons.results.map(async (pokemon) => {
            return await pokemonService.getOnePokemonDetails(pokemon.name)
          })
        )

        const pokeInfo = details.map(poke => {
          return {
            id: poke.id,
            type: poke.types[0].type.name,
            name: poke.name,
            sprite: poke.sprites.other.dream_world.front_default ?? poke.sprites.front_default
          }
        })
        // pokemonsList.value = details // Actualiza el estado reactivo
        pokemonsStore.setPokemons(pokeInfo)
        pokemonsStore.setCount(pokemons.count)
        pokemonsStore.setNext(pokemons.next)
        pokemonsStore.setPrevious(pokemons.previous)
      }
    } catch (err) {
      error.value = err as Error // Maneja errores
    } finally {
      loading.value = false // Finaliza el estado de carga
    }
  }

  const loadMorePokemons = async (url:string) => {
    const morePokemons = await pokemonService.getNextPokemon(url)
    const details = await Promise.all(
      morePokemons.results.map(async (pokemon) => {
        return await pokemonService.getOnePokemonDetails(pokemon.name)
      })
    )
    const pokeInfo = details.map(poke => {
      return {
        id: poke.id,
        type: poke.types[0].type.name,
        name: poke.name,
        sprite: poke.sprites.other.dream_world.front_default ?? poke.sprites.front_default
      }
    })
    pokeInfo.forEach(newPoke => pokemonList.value.push(newPoke))
    localStorage.setItem('pokemonList', JSON.stringify(pokemonList.value))
    // pokemonsStore.setPokemons(pokemonList.value)
    pokemonsStore.setCount(morePokemons.count)
    pokemonsStore.setNext(morePokemons.next)
    pokemonsStore.setPrevious(morePokemons.previous)
  }

  const searchOnePokemon = async (param: string | null) => {
    pokemonsStore.setAuxiliarPokemonsList(pokemonList.value)
    const storedPokemon = pokemonList.value.find(pokemon => pokemon.id === Number(param) || pokemon.name.toLowerCase() === param?.toLowerCase())
    if (storedPokemon) return pokemonsStore.setPokemons([storedPokemon])

    param && pokemonService.getOnePokemonDetails(param).then(pokemon => {
      pokemonsStore.setPokemons([{
        id: pokemon.id,
        type: pokemon.types[0].type.name,
        name: pokemon.name,
        sprite: pokemon.sprites.other.dream_world.front_default ?? pokemon.sprites.front_default
      }])
    }).catch(err => {
      q.notify({
        message: `Pokemon ${err.response.data}`,
        icon: 'warning',
        color: 'red'
      })
    })

    // if (pokemon) {
    // pokemonsStore.setPokemons([{
    //   id: pokemon.id,
    //   type: pokemon.types[0].type.name,
    //   name: pokemon.name,
    //   sprite: pokemon.sprites.other.dream_world.front_default ?? pokemon.sprites.front_default
    // }])
    // }
  }

  const restorePokemonList = () => {
    pokemonsStore.setPokemons(auxiliarPokemonList.value)
  }

  // Llama a la función asíncrona para cargar los datos
  loadPokemons()

  // Devuelve un objeto síncrono con los estados reactivos
  return {
    pokemonList,
    count,
    error,
    next,
    previous,
    loading,
    loadMorePokemons,
    searchOnePokemon,
    restorePokemonList
  }
}
