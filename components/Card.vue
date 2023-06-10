<template lang="pug">
.card(:class="{ disabled: isDisabled }" :style="{height: height, width: width, perspective: perspective}")
  .card__inner(:class="{'is-flipped' : isFlipped}" @click="onToggleFlipCard")
    .card__face.card__face--front
      .card__content 
    .card__face.card__face--back
      .card__content(:style="{backgroundImage: `url(/${imgBackFaceUrl})`}") 
</template>

<script lang="ts" setup>
import * as Types from '@/pages/utils/types';

const prop = defineProps<{
  card: Object,
  imgBackFaceUrl: String,
  rules: Types.Rule[],
  cardsContext: Number[]
}>()

const height = computed(() => {
  return `${(920 - 16 * 4) / Math.sqrt(prop.cardsContext.length) - 16}px`
});
const width = computed(() => {
  return `${(((920 - 16 * 4) / Math.sqrt(prop.cardsContext.length) - 16) * 3) / 4}px`
});
const perspective = computed(() => {
  return `${((((920 - 16 * 4) / Math.sqrt(prop.cardsContext.length) - 16) * 3) / 4) * 2}px`
});

const emit = defineEmits(['onFlip'])

var isFlipped = ref(false)
var isDisabled = ref(false)

const onToggleFlipCard = () => {  
  if (prop.rules.length >= 2) return;  
  if (isDisabled.value) return;
  isFlipped.value = !isFlipped.value
  if (isFlipped.value) {
    emit("onFlip", prop.card)
  }
}

const onFlipBackCard = () => {
  isFlipped.value = false
}

const onEnabledDisabledMode = () =>  {
  isDisabled.value = true
}

defineExpose({onFlipBackCard, onEnabledDisabledMode})
</script>

<style lang="sass" scoped>
@import '../assets/sass/card'
</style>