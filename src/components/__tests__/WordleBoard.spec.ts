import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import WordleBoard from '~/components/WordleBoard.vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '~/utils/settings';

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS';
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } });
  });

  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find('input[type=text]');
    await guessInput.setValue(guess);
    await guessInput.trigger('keydown.enter');
  }

  describe('End of the game messages', () => {
    it('a victory message appears when user make a guess that matches the word of the day', async () => {
      await playerSubmitsGuess(wordOfTheDay);

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });

    it('a defeat message appears if the user makes a guess that is incorrect', async () => {
      await playerSubmitsGuess('WRONG');

      expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
    });

    it('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    });
  });

  describe('Rules for defining the word of the day', () => {
    beforeEach(() => {
      console.warn = vi.fn();
    });

    it.each([
      { wordOfTheDay: 'FLY', reason: 'word-of-the-day must have 5 characters' },
      { wordOfTheDay: 'tests', reason: 'word-of-the-day must be all in uppercase' },
      { wordOfTheDay: 'QWERT', reason: 'word-of-the-day must be a valid English word' }
    ])(
      'Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted',
      async ({ wordOfTheDay }) => {
        mount(WordleBoard, { props: { wordOfTheDay } });

        expect(console.warn).toHaveBeenCalled();
      }
    );

    it('no warning is emitted if the word of the day provided is a real uppercase English word with 5 characters', async () => {
      mount(WordleBoard, { props: { wordOfTheDay: 'TESTS' } });

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('Player input', () => {
    it.todo('player guesses are limited to 5 letters');
    it.todo('player guesses can only be submitted if they are real words');
    it.todo('player guesses are not case-sensitive');
    it.todo('player guesses can only contain letters');
  });
});
