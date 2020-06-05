import { cardsContainerElem } from './domElements';
import { stopTimer } from './timer';
import createCards from './createCards';
import gameOverMessage from './gameOverMessage';
import animateCards from './animateCards';
import store from './store/store';
import { ADD_CARDS } from './store/actions';

function endGame() {
  cardsContainerElem.innerHTML = '';
  cardsContainerElem.style.cssText = 'grid-template-columns: repeat(8, 1fr);';

  stopTimer();

  const cards = createCards(gameOverMessage, ['card'], false);

  store.dispatch({ type: ADD_CARDS, cards });

  animateCards(cards, 'card--open', true, 5000);
}

export default endGame;
