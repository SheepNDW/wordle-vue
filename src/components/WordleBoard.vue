<script setup lang="ts">
import { computed, ref } from 'vue';
import { DEFEAT_MESSAGE, DICTIONARY, VICTORY_MESSAGE, WORD_SIZE } from '~/utils/settings';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => DICTIONARY.has(value)
  }
});

const guessInProgress = ref('');
const guessSubmitted = ref('');

const formattedGuessInProgress = computed({
  get: () => guessInProgress.value,
  set: (rawValue: string) => {
    guessInProgress.value = rawValue.slice(0, WORD_SIZE).toUpperCase();
  }
});
</script>

<template>
  <input
    type="text"
    :maxlength="WORD_SIZE"
    v-model="formattedGuessInProgress"
    @keydown.enter="guessSubmitted = guessInProgress"
  />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  />
</template>
