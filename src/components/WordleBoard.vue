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
  <main class="flex flex-col items-center mt-12">
    <GuessInput @guess-submitted="(guess) => (guessSubmitted = guess)" />

    <p
      v-if="guessSubmitted.length > 0"
      class="end-of-game-message"
      v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
  </main>
</template>

<style scoped>
.end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}

@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
