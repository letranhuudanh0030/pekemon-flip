<template lang="pug">
.screen
  .screen__inner(:style="{width: width}")
    Card(v-for="(card, index) in cardsContext" :key="index" ref="contentRef" :rules="rules" :card="{index: index, value: card}" :imgBackFaceUrl="`images/${card}.png`" :cardsContext="cardsContext"  @onFlip="checkRule($event)")
</template>

<style lang="sass" scoped>
.screen
  width: 100%
  height: 100vh
  position: absolute
  top: 0
  left: 0
  z-index: 2
  background-color: var(--dark)
  color: var(--light)

.screen__inner
  width: calc(424px)
  display: flex
  flex-wrap: wrap
  margin: 2rem auto
</style>

<script lang="ts" setup>
import * as Types from '@/pages/utils/types';

const props = defineProps<{
  cardsContext: number[];
}>();

const width = computed(() => {
  return `${((((920 - 16 * 4) / Math.sqrt(props.cardsContext.length) - 16) * 3) / 4 + 16) * Math.sqrt(props.cardsContext.length)}px`
})

var rules = ref<Types.Rule[]>([]);
const contentRef = ref<any[]>([]);
const emit = defineEmits(['onFinish']);

const checkRule = (card: Types.Card) => {
  let ruleLen = rules.value.length;
  if (ruleLen === 2) return false;
  rules.value.push(card);

  if (ruleLen === 1 && rules.value[0].value === rules.value[1].value) {
    console.log('Right ...');
    contentRef.value[rules.value[0].index].onEnabledDisabledMode();
    contentRef.value[rules.value[1].index].onEnabledDisabledMode();
    rules.value = [];

    const disabledElements = document.querySelectorAll(
      '.screen .card.disabled'
    );
    if (
      disabledElements &&
      disabledElements.length === props.cardsContext.length - 2
    )
      setTimeout(() => {
        emit('onFinish');
      }, 920);
  } else if (ruleLen === 1 && rules.value[0].value !== rules.value[1].value) {
    console.log('Wrong ...');
    setTimeout(() => {
      contentRef.value[rules.value[0].index].onFlipBackCard();
      contentRef.value[rules.value[1].index].onFlipBackCard();
      rules.value = [];
    }, 800);
  } else {
    return false;
  }
};
</script>
