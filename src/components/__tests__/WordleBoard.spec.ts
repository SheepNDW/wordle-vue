import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import WordleBoard from '~/components/WordleBoard.vue';
import { VICTORY_MESSAGE } from '~/utils/settings';

describe('WordleBoard', () => {
  it('a victory message appears when user make a guess that matches the word of the day', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'TESTS' } });

    const guessInput = wrapper.find('input[type=text]');
    await guessInput.setValue('TESTS');
    await guessInput.trigger('keydown.enter');

    expect(wrapper.text()).toContain(VICTORY_MESSAGE);
  });

  it('a defeat message appears if the user makes a guess that is incorrect', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'TESTS' } });

    const guessInput = wrapper.find('input[type=text]');
    await guessInput.setValue('WRONG');
    await guessInput.trigger('keydown.enter');

    expect(wrapper.text()).toContain('Better luck next time!');
  });

  it.todo('no end-of-game message appears if the user has not yet made a guess');
});
