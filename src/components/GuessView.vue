<script setup lang="ts">
import { WORD_SIZE } from '~/utils/settings';

defineProps<{ guess: string }>();
</script>

<template>
  <ul class="flex gap-1">
    <li
      v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')"
      :key="`${letter}-${index}`"
      class="w-20 h-20 bg-white border border-[hsl(0, 0%, 70%)] flex items-center justify-center text-2rem font-bold"
      :class="[letter === ' ' ? 'animate-pulse-alt' : '']"
    >
      {{ letter }}
    </li>
  </ul>
</template>
