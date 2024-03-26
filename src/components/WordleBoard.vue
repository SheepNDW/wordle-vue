<script setup lang="ts">
import { ref } from 'vue';
import GuessInput from '~/components/GuessInput.vue';
import { DEFEAT_MESSAGE, DICTIONARY, VICTORY_MESSAGE } from '~/utils/settings';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => DICTIONARY.has(value)
  }
});

const guessSubmitted = ref('');
</script>

<template>
  <GuessInput @guess-submitted="(guess) => (guessSubmitted = guess)" />

  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  />
</template>
