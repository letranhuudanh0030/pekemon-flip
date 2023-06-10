<template lang="pug">
Main(v-if="statusMatch === STATUS_MATCH.default" @onStart="onHandleBeforeStart($event)")
Interact(v-if="statusMatch === STATUS_MATCH.match" :cardsContext="settings.cardsContext" @onFinish="onGetResult")
Result(v-if="statusMatch === STATUS_MATCH.result" :timer="timer" @onStartAgain="statusMatch = STATUS_MATCH.default")
Footer
</template>

<script lang="ts" setup>
  import {STATUS_MATCH} from '@/pages/utils/constants'
  import * as Types from '@/pages/utils/types'
  import {shuffled} from '@/pages/utils/array'
  var statusMatch = ref(STATUS_MATCH.default)
  var settings = reactive({
    totalOfBlock: 0,
    cardsContext: [] as number[],
    startedAt: 0,
  })
  var timer = ref(0)
  
  const onHandleBeforeStart = (config: Types.Config) => {
    settings.totalOfBlock = config.totalOfBlock
    statusMatch.value = STATUS_MATCH.match;

    const firstCards = Array.from(
      {length: settings.totalOfBlock / 2},
      (_, i) => i + 1
    )
    const secondCards = [...firstCards]
    const cards = [...firstCards, ...secondCards]
    settings.cardsContext = shuffled(shuffled(shuffled(shuffled(cards))))
    settings.startedAt =  new Date().getTime()

  }

  const onGetResult = () => {
    timer.value = new Date().getTime() - settings.startedAt
    statusMatch.value = STATUS_MATCH.result
  }
</script>