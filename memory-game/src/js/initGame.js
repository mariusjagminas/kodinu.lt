import { cardsContainerElem, timeElem } from './domElements';
import global from './globalVariables';
import { stopTimer } from './timer';
import generateRandomNumbers from './generateRandomNumbers';
import createCards from './createCards';
import handleClick from './handleClick';
import animateCards from './animateCards';

const initGame = () => {
  cardsContainerElem.innerHTML = '';
  cardsContainerElem.style.cssText = global.level.numberOfColumns;
  global.cardsPair = [];
  global.cards = [];
  stopTimer();
  timeElem.innerText = '00:00';
  const randomNumbers = generateRandomNumbers(global.level.numberOfCards);
  global.cards = createCards(
    randomNumbers,
    ['card', 'card--hidden', 'card--open'],
    handleClick
  );
  animateCards(global.cards, 'card--hidden', false, 800);
  setTimeout(() => {
    animateCards(global.cards, 'card--open', false, 2000);
  }, 1000);
};

export default initGame;
