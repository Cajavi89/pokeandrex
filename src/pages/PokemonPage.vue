<template>
  <q-page-container class="q-pt-none">
    <q-page >
      <div class="card-wrapper relative-position" >

        <div class="header" :style="{backgroundColor : pickColor(pokemon?.types[0].type.name as PokemonType)}">

          <!-- BOTON DE VOLVER -->
           <router-link to="/" class="text-white">
            <q-icon name="west" size="xl" class="absolute-top-left cursor-pointer" />
          </router-link>

          <!-- FOTO DEL POKEMON -->
          <img class="imagen" :src="pokemon?.sprites.other.dream_world.front_default ?? pokemon?.sprites.front_default" />

          <!-- NOMBRE DEL POKEMON -->
           <div class="flex items-center">
             <div class="text-h2 text-bold text-capitalize">{{ pokemon?.name }}</div>
             <q-badge class="q-px-sm q-py-xs self-start q-mt-sm" style="z-index: 99;">{{ `#${pokemon?.id}` }}</q-badge>
           </div>
          <!-- CHIPS DE TIPO DE POKEMON -->
          <div class="flex q-mb-md">

             <TypeChip  v-for="type of pokemon?.types" :key="type.slot"
               :label="type.type.name"
               :type="type.type.name"
              />
          </div>

        </div>
        <!-- INFO -->
        <div class="flex justify-between full-width q-pa-md bg-grey-4">
          <div class="flex">

            <ul class="vs-types-table" v-for="(type,index) of typeInfo" :key="index">

              <TypeChip v-if="pokemon?.types[0].type.name && index === 0"
                      :label="pokemon?.types[0].type.name"
                      :type="pokemon?.types[0].type.name"
                      :small="true"
            />
            <div v-if="pokemon?.types?.length! > 1">
              <TypeChip v-if="pokemon?.types[1].type.name && index === 1"
                  :label="pokemon?.types[1].type.name"
                  :type="pokemon?.types[1].type.name"
                  :small="true"
              />
            </div>
              <!-- DAMAGE TO -->
              <div class="relative-position">

                <div class="text-body1">Damage to:</div>
                <div class="relative-position section-individual" v-if="type.double_damage_to.length">
                  <div class="multiplier-text">x2</div>
                  <TypeChip  v-for="typeName in type.double_damage_to" :key="typeName.name"
                      :label="typeName.name"
                      :type="typeName.name"
                      :small="true"
                  />

                </div>
                <div class="relative-position section-individual" v-if="type.half_damage_to.length">
                  <div class="multiplier-text">1/2</div>
                  <TypeChip  v-for="typeName in type.half_damage_to" :key="typeName.name"
                    :label="typeName.name"
                    :type="typeName.name"
                    :small="true"
                  />
                </div>

              </div>
              <!-- DAMAGE FROM -->
              <div>
                <div class="text-body1">Damage from:</div>
                <div class="relative-position section-individual" v-if="type.double_damage_from.length">
                  <div class="multiplier-text">x2</div>
                  <TypeChip  v-for="typeName in type.double_damage_from" :key="typeName.name"
                    :label="typeName.name"
                    :type="typeName.name"
                    :small="true"
                  />
                </div>
                <div class="relative-position section-individual" v-if="type.half_damage_from.length">
                  <div class="multiplier-text">1/2</div>
                  <TypeChip  v-for="typeName in type.half_damage_from" :key="typeName.name"
                    :label="typeName.name"
                    :type="typeName.name"
                    :small="true"
                  />

                </div>

              </div>
              <p class="text-body1">immune vs:</p>
              <TypeChip  v-for="typeName in type.no_damage_from" :key="typeName.name"
                :label="typeName.name"
                :type="typeName.name"
                :small="true"
              />
              <p class="text-body1">useless vs:</p>
              <TypeChip  v-for="typeName in type.no_damage_to" :key="typeName.name"
                :label="typeName.name"
                :type="typeName.name"
                :small="true"
              />
            </ul>
          </div>

          <!-- MOVIMIENTOS -->
          <div>
            <p class="text-body2 text-bold q-mt-md">moves:</p>
            <div class="row">
                <div class="col-4">
                  <q-card-section>
                    <span>Learned by Level-Up:</span>
                    <div v-for="(move, index) of movesByLevelup"
                      :key="`${move}_${index}`"
                    >
                      <q-card
                      @click="()=> isOpenMovesDestails = true"
                      style="border: 1px solid 'grey-4';"
                      class="cursor-pointer q-mb-md q-pa-xs"
                      >
                        <div class="text-capitalize">name:<span class="text-body2 text-bold q-ml-xs" style="text-decoration: underline;"> {{ move.name }} </span></div>
                        <div>level:<span class="text-body2 text-bold q-ml-xs" style="text-decoration: underline;"> {{ move.level }} </span></div>
                        <TypeChip
                          :label="move.moveType "
                          :type="move.moveType"
                          :small="true"
                        />
                      </q-card>
                    </div>
                  </q-card-section>

              </div>
                <div class="col-4">
                  <q-card-section>
                    <div v-for="(move, index) of movesByTutor"
                    :key="`${move}_${index}`"
                    >
                    <span>Learned by Tutor</span>
                      <q-card @click="()=> isOpenMovesDestails = true" style="border: 1px solid 'grey-4';" class="cursor-pointer q-mb-md q-pa-xs ">
                        <div class="text-capitalize">name:<span class="text-body2 text-bold q-ml-xs" style="text-decoration: underline;"> {{ move.name }} </span></div>
                        <TypeChip
                          :label="move.moveType "
                          :type="move.moveType"
                          :small="true"
                        />
                      </q-card>
                    </div>
                  </q-card-section>

              </div>
                <div class="col-4">
                  <q-card-section>
                    <span>Learned by Machine:</span>
                    <div v-for="(move, index) of movesByMachine"
                      :key="`${move}_${index}`"
                    >
                      <q-card @click="()=> isOpenMovesDestails = true" style="border: 1px solid 'grey-4';" class="cursor-pointer q-mb-md q-pa-xs ">
                        <div class="text-capitalize">name:<span class="text-body2 text-bold q-ml-xs" style="text-decoration: underline;"> {{ move.name }} </span></div>
                        <TypeChip
                          :label="move.moveType "
                          :type="move.moveType"
                          :small="true"
                        />
                      </q-card>
                    </div>
                  </q-card-section>
              </div>
            </div>

          </div>

          <!-- EVOLUCIONES -->
          <div>
            esto es la info
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <router-link :to="`/pokemon/${pokemon?.id!-1}`">
          <q-btn icon="west" >Anterior</q-btn>
        </router-link>
        <router-link :to="`/pokemon/${pokemon?.id!+1}`">
          <q-btn icon-right="east" >sigueinte</q-btn>

        </router-link>

      </div>
    </q-page>

    <q-dialog v-model="isOpenMovesDestails">
      <q-page  class="bg-white" style="width: 600px; height: 400px;">
        Pronto esta funcionalidad
      </q-page>
    </q-dialog>
  </q-page-container>
  <!-- Mostrar nombre/ID del Pokémon -->

</template>

<script lang="ts" setup>
// import { usePokemons } from 'src/composables/usePokemons'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TypeChip from 'src/components/typeChip/TypeChip.vue'
import { PokemonsService } from 'src/api/pokeapi'
import { IPokemonDetails, ITypeDamageRelation } from 'src/interfaces/getPokemonList'
import { pickColor, PokemonType } from 'src/helpers/pickColor'
// import { useDialogPluginComponent } from 'quasar'

const route = useRoute()
// const pokemions = usePokemons()
const pokemon = ref<IPokemonDetails>()
const typeInfo = ref<ITypeDamageRelation[]>([])
const pokemonsService = new PokemonsService()
// Mejor tipado para los parámetros de ruta
const identifier = computed(() => (route.params.identifier as string)?.toLowerCase())

// const { onDialogCancel } = useDialogPluginComponent()

const isOpenMovesDestails = ref<boolean>(false)

// const movesByMachine = computed(() => pokemon.value?.moves.filter(move => move.version_group_details[0].move_learn_method.name === 'machine'))
// const movesByTutor = computed(() => pokemon.value?.moves.filter(move => move.version_group_details[0].move_learn_method.name === 'tutor'))
const movesByLevelup = ref<{name: string, level: number, moveType: string}[]>([])
const movesByTutor = ref<{name: string, level: number, moveType: string}[]>([])
const movesByMachine = ref<{name: string, level: number, moveType: string}[]>([])

const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

// Función auxiliar para obtener y procesar movimientos
const getMoves = async (pokemon: IPokemonDetails, learnMethod: string, sortBy: 'level' | 'name' = 'level') => {
  const cacheKey = `pokemon-moves-${pokemon.id}-${learnMethod}` // Clave única para el localStorage
  const cachedMoves = getFromLocalStorage(cacheKey)

  // Si los movimientos están en el localStorage, los devolvemos
  if (cachedMoves) {
    return cachedMoves
  }

  // Si no están en el localStorage, los obtenemos de la API
  const moves = pokemon.moves
    .filter(move => move.version_group_details[0].move_learn_method.name === learnMethod)
    .map(async (move) => {
      const moveDetails = await pokemonsService.getMove(move.move.url)
      return {
        name: move.move.name,
        level: move.version_group_details[0].level_learned_at,
        moveType: moveDetails.type.name
      }
    })

  const resolvedMoves = await Promise.all(moves)

  if (sortBy === 'level') {
    resolvedMoves.sort((a, b) => a.level - b.level)
  } else if (sortBy === 'name') {
    resolvedMoves.sort((a, b) => a.name.localeCompare(b.name))
  }

  // Guardamos los movimientos en el localStorage para futuras consultas
  saveToLocalStorage(cacheKey, resolvedMoves)

  return resolvedMoves
}

onMounted(async () => {
  // traer y asignar el pokemon individual
  pokemon.value = await pokemonsService.getOnePokemonDetails(identifier.value)

  // traer los tipos damage relation
  const getTypes = await Promise.all(pokemon.value.types.map(async (type) => {
    return await pokemonsService.getOneTypeDetails(type.type.name)
  }))
  typeInfo.value = getTypes

  // Obtener y asignar movimientos
  movesByLevelup.value = await getMoves(pokemon.value, 'level-up', 'level')
  movesByTutor.value = await getMoves(pokemon.value, 'tutor', 'name')
  movesByMachine.value = await getMoves(pokemon.value, 'machine', 'name')
})

</script>

<style lang="sass" scoped>
/* Agregar estilos para mejor presentación */

.card-wrapper
  display: flex
  flex-direction: column
  align-items: center!important
  // place-content: center
  // border: 1px solid red
  // max-width: 800px
  margin: 0 auto
  position: relative // Necesario para posicionar el pseudo-elemento
  // overflow: hidden // Para evitar que el pseudo-elemento se salga del contenedor
  background-color: $grey-4
  color: #000
  border-end-end-radius: 10px //bottom right
  border-start-end-radius: 10px // top right
  border-start-start-radius: 10px //top left
  border-end-start-radius: 10px //bottom left

.header
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-around
  position: relative // Necesario para posicionar el pseudo-elemento
  overflow: hidden // Para evitar que el pseudo-elemento se salga del contenedor
  width: 100%!important
  // min-width: 100% !important
  border-end-end-radius: 200px //bottom right
  border-end-start-radius: 200px //bottom left
  border-start-end-radius: 10px // top right
  border-start-start-radius: 10px //top left
  color: #fff
  margin-bottom: 30xp
  row-gap: 20px

  &::before
    content: 'asdasdasd'
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-image: url('/pokeball.svg')
    background-repeat: no-repeat
    background-position-x: right
    background-size: 40% // Aumentar el tamaño de la imagen de fondo
    opacity: 0.3// Reducir la opacidad de la imagen de fondo
    transform: rotate(15deg) // Rotar la imagen de fondo
    z-index: 0 // Enviar el pseudo-elemento al fondo para que no cubra el contenido

.imagen
  z-index: 99
  max-width: 300px
  min-width: 300px

.multiplier-text
  font-size: 20px
  font-family: "Atma", serif
  font-weight: 600
  font-style: normal
  position: absolute
  right: 0px

.vs-types-table
  // border: 1px solid $grey-4
  // border-radius: 10px
  list-style-type: none
  padding-left: 0
  // padding:4px
  width: 120px
  margin-right: 10px

.section-individual
  border: 1px solid $grey-5
  margin-bottom:10px
  border-radius: 10px
  padding:4px

</style>
