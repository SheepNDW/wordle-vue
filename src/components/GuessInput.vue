<script setup lang="ts">
import { computed, ref, triggerRef } from 'vue';
import { DICTIONARY, WORD_SIZE } from '~/utils/settings';

const emit = defineEmits<{
  'guess-submitted': [guess: string];
}>();

const guessInProgress = ref<string>('');

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

  emit('guess-submitted', formattedGuessInProgress.value);
}
</script>

<template>
  <input
    type="text"
    :maxlength="WORD_SIZE"
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmittedGuess"
  />
</template>
