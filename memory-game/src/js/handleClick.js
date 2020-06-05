import { startTimer } from './timer';
import store from './store/store';
import { FLUSH_CARDS_PAIR, PUSH_CARD_TO_CARDS_PAIR } from './store/actions';
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
  const { cardsPair } = store.getState();
  if (cardsPair[0].dataset.card === cardsPair[1].dataset.card) {
    cardsPair[0].classList.add('card--inactive');
    cardsPair[1].classList.add('card--inactive');

    store.dispatch({ type: FLUSH_CARDS_PAIR });
  }
}

function allDisabled() {
  const { cards } = store.getState();
  const result = cards.filter(
    (card) => !card.classList.contains('card--inactive')
  );

  return result.length === 0;
}

function handleClick() {
  startTimer();

  if (isCardDisabled(this)) return;

  this.classList.toggle('card--open');

  const { cardsPair } = store.getState();

  if (cardsPair.length > 1) {
    cardsPair.forEach((card) => closeCard(card));
    store.dispatch({ type: FLUSH_CARDS_PAIR });
  }

  if (!isOpen(this)) {
    store.dispatch({ type: FLUSH_CARDS_PAIR });
  }

  if (isOpen(this)) {
    store.dispatch({ type: PUSH_CARD_TO_CARDS_PAIR, card: this });
  }

  const { cardsPair: cardsPair2 } = store.getState();

  if (cardsPair2.length > 1) {
    disableIfMatches();

    if (allDisabled()) {
      setTimeout(endGame, 300);
    }
  }
}

export default handleClick;
