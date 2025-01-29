<template>
  <q-page class="general-wrapper col text-center items-center justify-evenly ">
    <h3 class="title">POKEDEX</h3>
    <q-form>
      <q-input
       outlined
       label='Search Pokemon'
       v-model='pokeName'
       bg-color="grey-9"
       color="grey-4"
       dark
       rounded
       style="max-width: 800px; margin:0 auto"
       :debounce="300"
       @update:model-value="searchPokemon"
      >
        <template v-slot:append>
          <q-btn
            @click='searchPokemon'
            label='buscar'
            color='white'
            text-color="black"
            type='submit'
            rounded
          />
        </template>
      </q-input>
    </q-form>
    <div v-if="pokemions.loading.value">Cargando...</div>

    <div class="flex scrollE" style="justify-content: center;">
      <MiniThumbnail v-for="pokemon of pokemions.pokemonList.value " :key="`${pokemon?.id}`"
        :url="pokemon?.sprite"
        :name="pokemon.name" class="pokemonList"
        :id="pokemon.id"
        :type="pokemon.type"
      />
    </div>
    <!-- <div v-if="isLoading">cargando</div> -->
     <q-btn v-if="pokemions.pokemonList.value.length > 1" @click="pokemions.loadMorePokemons(pokemions.next.value)">Load more!</q-btn>

  </q-page>
</template>

<script setup lang="ts">
import MiniThumbnail from 'src/components/miniThumbnail/MiniThumbnail.vue'
import { onMounted, ref } from 'vue'
import { usePokemons } from 'src/composables/usePokemons'

const pokemions = usePokemons()
const pokeName = ref<string | null>(null)

const searchPokemon = async () => {
  if (pokeName.value) pokemions.searchOnePokemon(pokeName.value)
  else pokemions.restorePokemonList()
}

onMounted(() => {
  if (!pokeName.value && pokemions.pokemonList.value.length <= 1) pokemions.restorePokemonList()
})
</script>

<style scoped>
.evolves-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.general-wrapper{
  max-width: 1280px;
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
.scrollE{
  overflow-y: auto;
}

.title{
  font-family: 'Atma', serif;
}
</style>
