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

  it('if a word of the day provided does not have exactly 5 characters, a warning is emitted', async () => {
    console.warn = vi.fn();

    mount(WordleBoard, { props: { wordOfTheDay: 'TOO_LONG' } });

    expect(console.warn).toHaveBeenCalled();
  });
});
