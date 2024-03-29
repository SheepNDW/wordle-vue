<script setup lang="ts">
import { computed, ref, triggerRef } from 'vue';
import GuessView from '~/components/GuessView.vue';
import { DICTIONARY, WORD_SIZE } from '~/utils/settings';

defineProps<{
  disabled: boolean;
}>();

const emit = defineEmits<{
  'guess-submitted': [guess: string];
}>();

const guessInProgress = ref<string>('');

const hasFailedValidation = ref<boolean>(false);

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
    hasFailedValidation.value = true;
    setTimeout(() => (hasFailedValidation.value = false), 500);
    return;
  }

  emit('guess-submitted', formattedGuessInProgress.value);
  guessInProgress.value = '';
}
</script>

<template>
  <GuessView
    v-if="!disabled"
    :class="{ 'animate-shake-x animate-duration-100 animate-iteration-2': hasFailedValidation }"
    :guess="formattedGuessInProgress"
  />

  <input
    type="text"
    :maxlength="WORD_SIZE"
    :disabled="disabled"
    autofocus
    @blur="({ target }) => (target as HTMLInputElement).focus()"
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmittedGuess"
    class="absolute opacity-0"
  />
</template>
