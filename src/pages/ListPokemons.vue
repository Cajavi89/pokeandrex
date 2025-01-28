<template>
  <q-page class="general-wrapper col text-center items-center justify-evenly ">
    <h3>POKEDEX</h3>
    <div v-if="pokemions.loading.value">Cargando...</div>

    <div class="flex scrollE">
      <MiniThumbnail v-for="pokemon of pokemions.pokemonList.value " :key="`${pokemon?.id}`"
        :url="pokemon?.sprite"
        :name="pokemon.name" class="pokemonList"
        :id="pokemon.id"
        :type="pokemon.type"
      />
    </div>
    <!-- <div v-if="isLoading">cargando</div> -->
     <q-btn @click="pokemions.loadMorePokemons(pokemions.next.value)">Load more!</q-btn>

  </q-page>
</template>

<script setup lang="ts">
import MiniThumbnail from 'src/components/miniThumbnail/MiniThumbnail.vue'
// import { onMounted } from 'vue'
import { usePokemons } from 'src/composables/usePokemons'

const pokemions = usePokemons()
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
</style>
