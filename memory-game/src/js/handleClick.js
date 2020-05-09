import { startTimer } from './timer';
import global from './globalVariables';
import endGame from './endGame';

function closeCard(card) {
  card.classList.remove('card--open');
}

function isOpen(card) {
  return card.classList.contains('card--open');
}

function isCardDisabled(card) {
  return card.classList.contains('card--inactive');
}

function disableIfMatches() {
  if (global.cardsPair[0].dataset.card === global.cardsPair[1].dataset.card) {
    global.cardsPair[0].classList.add('card--inactive');
    global.cardsPair[1].classList.add('card--inactive');

    global.cardsPair = [];
  }
}

function AllDisabled() {
  const result = global.cards.filter(
    (card) => !card.classList.contains('card--inactive')
  );

  return result.length === 0;
}

function handleClick() {
  startTimer();

  if (isCardDisabled(this)) return;

  this.classList.toggle('card--open');

  if (global.cardsPair.length > 1) {
    global.cardsPair.forEach((card) => closeCard(card));
    global.cardsPair = [];
  }
  if (!isOpen(this)) {
    global.cardsPair = [];
  }
  if (isOpen(this)) {
    global.cardsPair.push(this);
  }
  if (global.cardsPair.length > 1) {
    disableIfMatches();

    if (AllDisabled()) {
      setTimeout(endGame, 300);
    }
  }
}

export default handleClick;
