<template lang="pug">
.screen 
  h1 POKEMON MEMORIES
  h3 Select mode to start game 
  .modes 
    button(@click="onStart(MODE.M4X4)")
      span 4x4
      span Easy
    button(@click="onStart(MODE.M6X6)")
      span 6x6
      span Normal
    button(@click="onStart(MODE.M8X8)")
      span 8x8
      span Hard
    button(@click="onStart(MODE.M10X10)")
      span 10x10
      span Super Hard
</template>

<style lang="sass" scoped>
@import '../assets/sass/main'
</style>

<script lang="ts" setup>
import {MODE} from '@/pages/utils/constants';

const emit = defineEmits(['onStart'])

const onStart = (totalOfBlock: number) => {
  emit("onStart", {totalOfBlock})
}
</script>