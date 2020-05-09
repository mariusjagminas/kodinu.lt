import { cardsContainerElem } from './domElements';
import { stopTimer } from './timer';
import global from './globalVariables';
import createCards from './createCards';
import gameOverMessage from './gameOverMessage';
import animateCards from './animateCards';

function endGame() {
  cardsContainerElem.innerHTML = '';
  cardsContainerElem.style.cssText = 'grid-template-columns: repeat(8, 1fr);';

  stopTimer();

  global.cards = createCards(gameOverMessage, ['card'], false);
  animateCards(global.cards, 'card--open', true, 5000);
}

export default endGame;
