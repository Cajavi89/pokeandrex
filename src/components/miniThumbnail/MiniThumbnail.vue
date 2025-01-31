<template>
  <router-link :to="`/pokemon/${props.name}`">
    <figure class="wrapper" :style="{backgroundColor: pickColor(props.type as PokemonType)}">
      <q-badge class="poke-id">#{{ props.id }}</q-badge>
      <q-img
        :src="props.url"
        style="max-width: 100%; max-height: 100%;"
      />
      <figcaption class="absolute-bottom text-subtitle1 text-center text-bold">{{ props.name }}</figcaption>
    </figure>
  </router-link>
</template>
<script lang="ts" setup>
import { pickColor, PokemonType } from 'src/helpers/pickColor'

export interface IMiniThumbnailProps {
  url: string
  name: string
  id: string | number
  type: string
}
const props = defineProps<IMiniThumbnailProps>()

</script>
<style lang="sass" scoped>
.wrapper
  position: relative
  align-items: center
  background-color: #fff
  border-radius: 10px
  border: 1px solid #000
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)
  color: #fff
  cursor: pointer
  display: flex
  font-size: 1.2rem
  font-weight: bold
  margin: 10px
  max-width: 140px
  min-width: 140px
  min-height: 200px
  padding: 10px
  text-align: center
  text-transform: capitalize

  &::before
    content: ''
    position: absolute
    top: 0
    left: 10px
    right: 25px
    bottom: 0
    background-image: url('/pokeball.svg')
    background-repeat: no-repeat
    background-position-x: right
    background-size: 100% // Aumentar el tamaño de la imagen de fondo
    opacity: 0.3// Reducir la opacidad de la imagen de fondo
    transform: rotate(15deg) // Rotar la imagen de fondo
    z-index: 0 // Enviar el pseudo-elemento al fondo para que no cubra el contenido

.poke-id
  position: absolute
  z-index: 99
  top:5px
  right: 10px
  padding: 5px 6px

</style>
