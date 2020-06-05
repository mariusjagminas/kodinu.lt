import { cardsContainerElem, timeElem } from './domElements';
import { stopTimer } from './timer';
import generateRandomNumbers from './generateRandomNumbers';
import createCards from './createCards';
import handleClick from './handleClick';
import animateCards from './animateCards';
import store from './store/store';
import { ADD_CARDS, DELETE_CARDS, FLUSH_CARDS_PAIR } from './store/actions';

const initGame = () => {
  const state = store.getState();

  cardsContainerElem.innerHTML = '';
  cardsContainerElem.style.cssText = state.level.numberOfColumns;

  store.dispatch({ type: FLUSH_CARDS_PAIR });
  store.dispatch({ type: DELETE_CARDS });

  stopTimer();
  timeElem.innerText = '00:00';

  const randomNumbers = generateRandomNumbers(state.level.numberOfCards);
  const cards = createCards(
    randomNumbers,
    ['card', 'card--hidden', 'card--open'],
    handleClick
  );

  store.dispatch({ type: ADD_CARDS, cards });

  animateCards(cards, 'card--hidden', false, 800);
  setTimeout(() => {
    animateCards(cards, 'card--open', false, 2000);
  }, 1000);
};

export default initGame;
