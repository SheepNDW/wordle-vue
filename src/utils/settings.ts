import englishWords from '~/utils/englishWordsWith5Letters.json';

export const VICTORY_MESSAGE = '🎉 Congratulations! 🎉';
export const DEFEAT_MESSAGE = 'Better luck next time!';
export const DICTIONARY = new Set<string>(englishWords);
export const WORD_SIZE = 5;

export const MAX_GUESSES_COUNT = 6;
