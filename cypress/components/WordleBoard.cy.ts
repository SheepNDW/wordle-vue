import WordleBoard from '../../src/components/WordleBoard.vue';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

describe('<WordleBoard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(WordleBoard);
  });
});
