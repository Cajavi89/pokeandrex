<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <q-page padding class="general-wrapper col text-center items-center justify-evenly ">
    <h3>pokeandrex</h3>
     <q-form>
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
    </q-form>
    <loader-component v-if='isLoading'/>

    <section class='row justify-center q-mt-md full-width' v-if='pokemon && !isLoading'>
      <!-- pokemion info -->
      <q-list bordered separator v-if='pokemon'>
        <q-item>
          <q-item-section>
            <q-item-label>
              <img :src="pokemon?.sprites?.front_default" :alt="pokemon.name">
            </q-item-label>
            <q-item-label>
              {{ pokemon?.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-for="(type, index) in pokemon?.types" :key="index">
          <q-item-section>
            <q-item-label>
              {{ ETypes[type?.type?.name.toUpperCase()] }}
            </q-item-label>
          </q-item-section>
        </q-item>
        </q-list>
        <!-- types info -->
        <q-list bordered separator>

        <q-item v-for='(info, index) of typeInfo' :key='index'>
          <q-item-section>
            <q-item-label v-for='(title, index) of Object.keys(info)' :key='index' class='row items-center'>
              {{ titlesDamageInfo[title] }}
              <q-item-label v-for='(data, index) of info[title].map((t: { name: any }) => t.name)' :key='index' class='q-mr-sm q-ml-sm font-bold text-weight-bold'>
                {{  ETypes[data.toUpperCase()]  }}
              </q-item-label>

            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if='allEvolveData.length'>
          <q-item-section>
            <p class='text-md'>evoluciones</p>
            <q-item-label bordered v-for="poke of allEvolveData" :key="poke.id" >
              <div class='evolves-container'>
                <div>
                  <p class='text-weight-bold'>{{ poke?.name }}</p>
                  <p v-for="(type, index) of poke?.types" :key='index'>
                    {{ ETypes[type.type.name.toUpperCase()] }}
                  </p>
                </div>
              <img :src="poke?.sprites?.front_default" :alt="poke.name">
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </section>

  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { titlesDamageInfo, ETypes } from 'src/interfaces/types'
import { POKEAPI_POKEMONS, POKEAPI_TYPES } from 'src/api/pokeapi'
import LoaderComponent from 'src/components/LoaderComponent.vue'

const pokeName = ref('')
const typeInfo = ref<any>([])
const pokemon = ref<any>([])
const specieInfo = ref<any>([])
const evolveInfo = ref<any>([])
const allEvolveData = ref<any>([])
const $q = useQuasar()
const isLoading = ref<boolean>(false)

const searchPokemon = async () => {
  try {
    isLoading.value = true
    const findPokemon = await fetch(`${POKEAPI_POKEMONS}/${pokeName.value.toLowerCase()}`)
    if (findPokemon.status === 404) {
      handlePokemonNotFound()
      return
    }
    pokemon.value = []
    typeInfo.value = []
    specieInfo.value = []
    evolveInfo.value = []
    allEvolveData.value = []

    pokemon.value = await findPokemon.json()
    typeInfo.value = await Promise.all(pokemon.value.types.map((type: { type: { name: string } }) => searchTypeInfo(type.type.name)))
    if (pokemon.value.species.url) {
      specieInfo.value = await getDataFromApi(pokemon.value.species.url)
    }
    if (specieInfo.value.evolution_chain.url) {
      evolveInfo.value = await getEvolveInfo(specieInfo.value.evolution_chain.url)
    }
    if (evolveInfo.value.length) {
      allEvolveData.value = await Promise.all(evolveInfo.value.map((poke: string) => poke !== null && getDataFromApi(`${POKEAPI_POKEMONS}/${poke}`)))
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

const searchTypeInfo = async (type: string) => {
  try {
    const res = await fetch(`${POKEAPI_TYPES}/${type}`)
    const resjson = await res.json()
    return resjson.damage_relations
  } catch (e) {
    if (e instanceof Error) return e.message
    throw e
  }
}

const handlePokemonNotFound = () => {
  $q.notify({
    message: 'No se encontro el pokemon',
    icon: 'warning',
    color: 'red'
  })
}

const getEvolveInfo = async (url: string) => {
  const evolveData = await getDataFromApi(url)
  return [
    evolveData.chain.species.name,
    evolveData.chain.evolves_to[0]?.species.name || null,
    evolveData.chain.evolves_to[0]?.evolves_to[0]?.species.name || null
  ]
}

const getDataFromApi = async (url: string) => {
  const res = await fetch(url)
  const resJson = await res.json()
  return resJson
}
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
</style>
