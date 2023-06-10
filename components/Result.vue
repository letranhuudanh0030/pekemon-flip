<template>
  <div class="screen">
    <h1>✨ Congratulations ✨</h1>
    <h3>{{ Math.round(timer / 920) }} seconds</h3>
    <button @click="onStartAgain">Start Again</button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  timer: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['onStartAgain']);

const onStartAgain = () => {
  emit('onStartAgain')
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/result'
</style>
