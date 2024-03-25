<script setup lang="ts">
import { computed, ref, triggerRef } from 'vue';
import { DEFEAT_MESSAGE, DICTIONARY, VICTORY_MESSAGE, WORD_SIZE } from '~/utils/settings';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => DICTIONARY.has(value)
  }
});

const guessInProgress = ref<string>('');
const guessSubmitted = ref('');

const formattedGuessInProgress = computed({
  get: () => guessInProgress.value,
  set: (rawValue: string) => {
    const formattedValue = rawValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '');

    guessInProgress.value = formattedValue;
    // need force update to trigger reactivity
    triggerRef(formattedGuessInProgress);
  }
});

function onSubmittedGuess() {
  if (!DICTIONARY.has(formattedGuessInProgress.value)) {
    return;
  }

  guessSubmitted.value = formattedGuessInProgress.value;
}
</script>

<template>
  <input
    type="text"
    :maxlength="WORD_SIZE"
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmittedGuess"
  />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  />
</template>
