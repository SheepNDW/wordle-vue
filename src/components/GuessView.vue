<script setup lang="ts">
import { WORD_SIZE } from '~/utils/settings';

withDefaults(
  defineProps<{
    guess: string;
    shouldFlip?: boolean;
  }>(),
  {
    shouldFlip: false
  }
);
</script>

<template>
  <ul class="flex gap-1">
    <li
      v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')"
      :key="`${letter}-${index}`"
      class="w-20 h-20 border border-[hsl(0, 0%, 70%)] flex items-center justify-center text-2rem font-bold letter"
      :class="{ 'animate-pulse-alt': letter === ' ', 'with-flips': shouldFlip }"
    >
      {{ letter }}
    </li>
  </ul>
</template>

<style scoped>
.letter {
  --front-color: hsl(0, 0%, 99%);
  --back-color: hsl(0, 0%, 70%);
  background-color: var(--front-color);
}

.with-flips:nth-of-type(1) {
  animation: flip-card 300ms forwards;
  animation-delay: 250ms;
}

.with-flips:nth-of-type(2) {
  animation: flip-card 300ms forwards;
  animation-delay: 500ms;
}

.with-flips:nth-of-type(3) {
  animation: flip-card 300ms forwards;
  animation-delay: 750ms;
}

.with-flips:nth-of-type(4) {
  animation: flip-card 300ms forwards;
  animation-delay: 1000ms;
}

.with-flips:nth-of-type(5) {
  animation: flip-card 300ms forwards;
  animation-delay: 1250ms;
}

@keyframes flip-card {
  0% {
    transform: rotateY(0);
    background-color: var(--front-color);
  }
  49% {
    background-color: var(--front-color);
  }
  50% {
    transform: rotateY(-90deg);
    background-color: var(--back-color);
  }
  100% {
    transform: rotateY(0);
    background-color: var(--back-color);
  }
}
</style>
