<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="general-wrapper col text-center items-center justify-evenly ">
    <h3>POKEDEX</h3>
     <!-- <q-form>
      <q-input
       outlined
       label='Nombre'
       v-model='pokeName'
      >
        <template v-slot:append>
          <q-btn
            @click='searchPokemon'
            label='buscar'
            color='primary'
            type='submit'
          />
        </template>
      </q-input>
    </q-form> -->
    <!-- <loader-component v-if='isLoading'/> -->

    <div class="flex">
      <MiniThumbnail v-for="(pokemon) of pokemonList" :key="`${pokemon}_${pokemon.id}`"
        :url="pokemon.sprites.other.dream_world.front_default"
        :name="pokemon.name" class="pokemonList"
      />
    </div>
    <div v-if="isLoading">cargando</div>

  </div>
</template>

<script setup lang="ts">
// import { useQuasar } from 'quasar'
// import { onMounted } from 'vue'
// import { titlesDamageInfo, ETypes, ETypesKeys, ITitlesDamageInfo } from 'src/interfaces/types'
// import { POKEAPI_POKEMONS, POKEAPI_TYPES } from 'src/api/pokeapi'
// import LoaderComponent from 'src/components/LoaderComponent.vue'
import MiniThumbnail from 'src/components/miniThumbnail/MiniThumbnail.vue'
// import { usePokemonStore } from 'src/composables/usePokemonStore'

// import { useRouter } from 'vue-router'
// import { storeToRefs } from 'pinia'
import { usePokemons } from 'src/composables/usePokemons'

const { pokemonList, isLoading } = usePokemons()
console.log('🚀 ~ pokemonList:', pokemonList)

// const router = useRouter()

// const navigateToPokemon = (pokemon: any) => {
//   router.push({
//     name: 'PokemonDetail',
//     params: { id: pokemon.id },
//     state: { pokemon }
//   })
// }

// const pokeName = ref('')
// const typeInfo = ref<any>([])
// const pokemon = ref<any>([])
// const specieInfo = ref<any>([])
// const evolveInfo = ref<any>([])
// const allEvolveData = ref<any>([])
// const $q = useQuasar()
// const isLoading = ref<boolean>(false)

// export interface IPokemonList {
//   name: string
//   url: string
// }

// const pokeStore = usePokemonStore()
// const { pokemonList } = storeToRefs(pokeStore)

// onMounted(async () => await pokeStore.fetchPokemon())

// const searchPokemon = async () => {
//   try {
//     isLoading.value = true
//     const findPokemon = await fetch(`${POKEAPI_POKEMONS}/${pokeName.value.toLowerCase()}`)
//     if (findPokemon.status === 404) {
//       handlePokemonNotFound()
//       return
//     }
//     pokemon.value = []
//     typeInfo.value = []
//     specieInfo.value = []
//     evolveInfo.value = []
//     allEvolveData.value = []

//     pokemon.value = await findPokemon.json()
//     typeInfo.value = await Promise.all(pokemon.value.types.map((type: { type: { name: string } }) => searchTypeInfo(type.type.name)))
//     if (pokemon.value.species.url) {
//       specieInfo.value = await getDataFromApi(pokemon.value.species.url)
//     }
//     if (specieInfo.value.evolution_chain.url) {
//       evolveInfo.value = await getEvolveInfo(specieInfo.value.evolution_chain.url)
//     }
//     if (evolveInfo.value.length) {
//       allEvolveData.value = await Promise.all(evolveInfo.value.map((poke: string) => poke !== null && getDataFromApi(`${POKEAPI_POKEMONS}/${poke}`)))
//     }
//   } catch (e) {
//     console.error(e)
//   } finally {
//     isLoading.value = false
//   }
// }

// const searchTypeInfo = async (type: string) => {
//   try {
//     const res = await fetch(`${POKEAPI_TYPES}/${type}`)
//     const resjson = await res.json()
//     return resjson.damage_relations
//   } catch (e) {
//     if (e instanceof Error) return e.message
//     throw e
//   }
// }

// const handlePokemonNotFound = () => {
//   $q.notify({
//     message: 'No se encontro el pokemon',
//     icon: 'warning',
//     color: 'red'
//   })
// }

// const getEvolveInfo = async (url: string) => {
//   const evolveData = await getDataFromApi(url)
//   return [
//     evolveData.chain.species.name,
//     evolveData.chain.evolves_to[0]?.species.name || null,
//     evolveData.chain.evolves_to[0]?.evolves_to[0]?.species.name || null
//   ]
// }

// const getDataFromApi = async (url: string) => {
//   const res = await fetch(url)
//   const resJson = await res.json()
//   return resJson
// }
</script>

<style scoped>
.evolves-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.general-wrapper{
  max-width: 800px;
  margin: 0 auto;
}
.poke-info{
  display: flex;
}
.poke-type{
  display: block;
  /* flex-direction: column; */
}
.pokemonList{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
}
</style>
