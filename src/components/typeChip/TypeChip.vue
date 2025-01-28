<template>
 <div
 :style="{backgroundColor: bgColor ? bgColor : ''}"
 class="text-body2"
 :class="props.small ? 'q-pa-sm text-white' : 'q-pa-md text-bold'"
 >
 {{ props.label }}
</div>

</template>
<script lang="ts" setup>
import { pickColor, type PokemonType } from 'src/helpers/pickColor'
import { ref } from 'vue'
 interface ITypeChipProps {
   label: string
   icon?: string
   type: string
   small?: boolean
 }

const props = defineProps<ITypeChipProps>()
const bgColor = ref()
bgColor.value = pickColor(props.type as PokemonType)

</script>

<style lang="sass" scoped>
div
  display: inline-flex
  justify-content: center
  align-items: center
  max-width: 70px
  border-radius: 10px
  border: 1px solid #fff
  max-height: 20px
  margin-right: 20px
  text-transform: capitalize
</style>
