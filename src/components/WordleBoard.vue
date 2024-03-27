<script setup lang="ts">
import { computed, ref } from 'vue';
import GuessInput from '~/components/GuessInput.vue';
import { DEFEAT_MESSAGE, DICTIONARY, MAX_GUESSES_COUNT, VICTORY_MESSAGE } from '~/utils/settings';

const props = defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => DICTIONARY.has(value)
  }
});

const guessSubmitted = ref<string[]>([]);

const isGameOver = computed(() => {
  return (
    guessSubmitted.value.length === MAX_GUESSES_COUNT ||
    guessSubmitted.value[guessSubmitted.value.length - 1] === props.wordOfTheDay
  );
});
</script>

<template>
  <main class="flex flex-col items-center mt-12">
    <ul>
      <li v-for="(guess, index) in guessSubmitted" :key="`${index}-${guess}`">
        {{ guess }}
      </li>
    </ul>

    <GuessInput @guess-submitted="(guess) => guessSubmitted.push(guess)" />

    <p
      v-if="isGameOver"
      class="end-of-game-message"
      v-text="
        guessSubmitted[guessSubmitted.length - 1] === wordOfTheDay
          ? VICTORY_MESSAGE
          : DEFEAT_MESSAGE
      "
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
