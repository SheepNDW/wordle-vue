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
  <ul class="flex gap-1">
    <li
      v-for="(letter, index) in formattedGuessInProgress.padEnd(WORD_SIZE, ' ')"
      :key="`${letter}-${index}`"
      class="w-20 h-20 bg-white border border-[hsl(0, 0%, 70%)] flex items-center justify-center text-2rem font-bold"
      :class="[letter === ' ' ? 'animate-pulse-alt' : '']"
    >
      {{ letter }}
    </li>
  </ul>

  <input
    type="text"
    :maxlength="WORD_SIZE"
    autofocus
    @blur="({ target }) => (target as HTMLInputElement).focus()"
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmittedGuess"
    class="absolute opacity-0"
  />
</template>
