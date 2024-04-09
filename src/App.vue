<script setup lang="ts">
import WordleBoard from '~/components/WordleBoard.vue';
import { DICTIONARY } from '~/utils/settings';

function generateHashFromDate(date: Date): number {
  // 將日期格式化為YYYYMMDD形式，這裡使用當地時間
  const dateString =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');

  // 使用簡單的雜湊函式來轉換日期字符串
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 將hash轉為32位整數
  }
  return Math.abs(hash); // 確保為正值
}

// pick a word of the day (use same word for current day)
// #1 - get current date
// #2 - create a hash of the date
// #3 - use the hash to pick a word from the dictionary
const date = new Date();
const hash = generateHashFromDate(date);
const wordOfTheDay = Array.from(DICTIONARY)[hash % DICTIONARY.size];
console.log('Word of the day:', wordOfTheDay);
</script>

<template>
  <div class="wrapper">
    <WordleBoard :word-of-the-day="wordOfTheDay" />
  </div>
</template>
