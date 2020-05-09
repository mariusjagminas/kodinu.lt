import '../styles/main.scss';

const cardsContainerElem = document.querySelector('.cards-board');
const resetButtonElem = document.querySelector('.btn');
const optionsElem = document.querySelector('#level');
const timeElem = document.querySelector('.game__time');

resetButtonElem.addEventListener('click', resetGame);
optionsElem.addEventListener('change', changeLevel);

let cards = [];
let cardsPair = [];
let level = {
  numberOfCards: 16,
  numberOfColumns: 'grid-template-columns: repeat(4,1fr);',
};
let timerOn = null;
const gameOverMessage = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'Y',
  'E',
  'A',
  'H',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',

  'Y',
  'O',
  'U',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'D',
  'I',
  'D',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'I',
  'T',
  '!',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];

function resetGame() {
  initGame();
}

function changeLevel(e) {
  switch (e.target.value) {
    case 'easy':
      level = {
        numberOfCards: 16,
        numberOfColumns: 'grid-template-columns: repeat(4, 1fr);',
      };
      initGame();
      break;
    case 'medium':
      level = {
        numberOfCards: 36,
        numberOfColumns: 'grid-template-columns: repeat(6, 1fr);',
      };
      initGame();
      break;
    case 'pro':
      level = {
        numberOfCards: 64,
        numberOfColumns: 'grid-template-columns: repeat(8, 1fr);',
      };
      initGame();
      break;
  }
}

function generateRandomNumbers(numberOfCards) {
  const arr = [...Array(numberOfCards / 2)];
  let numbersArray = [];

  arr.forEach((_, i) => {
    numbersArray.push(i);
    numbersArray.push(i);
  });
  const shuffledNumbers = shuffleNumbers(numbersArray);

  return shuffledNumbers;
}

function shuffleNumbers(numbers) {
  return numbers.sort(() => Math.random() - 0.5);
}

function createCards(itemsArr, classNames, eventHandler = null) {
  let cardsNodesArr = [];

  itemsArr.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add(...classNames);
    div.setAttribute('data-card', item);

    if (eventHandler) {
      div.addEventListener('click', eventHandler);
    }

    div.innerHTML = `
    <div class="card__frontface"></div>
    <div class="card__backface">
      <span class="card__number">${item}</span>
    </div>
  `;

    cardsNodesArr.push(div);
  });
  appendCards(cardsNodesArr);

  return cardsNodesArr;
}

function appendCards(cards) {
  cards.forEach((card) => cardsContainerElem.appendChild(card));
}

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
  if (cardsPair[0].dataset.card === cardsPair[1].dataset.card) {
    cardsPair[0].classList.add('card--inactive');
    cardsPair[1].classList.add('card--inactive');

    cardsPair = [];
  }
}

function AllDisabled() {
  const result = cards.filter(
    (card) => !card.classList.contains('card--inactive')
  );

  return result.length === 0;
}

function startTimer() {
  if (timerOn) return;

  const startTime = new Date().getTime();
  timerOn = setInterval(countTime, 1000);

  function countTime() {
    const timeNow = new Date().getTime();
    const timeElapsed = (timeNow - startTime) / 1000;

    const seconds = parseInt(timeElapsed % 60);
    const minutes = parseInt(timeElapsed / 60) % 60;
    const hours = parseInt(timeElapsed / 3600);

    timeElem.innerText = `${hours > 0 ? hours + ':' : ''}${
      minutes > 9 ? '' : 0
    }${minutes}:${seconds > 9 ? '' : 0}${seconds}`;
  }
}

function stopTimer() {
  clearInterval(timerOn);
  timerOn = null;
}

function animateCards(cards, className, shouldAddClass, delay) {
  const adjustedDelay = delay / (cards.length * 3);
  const method = shouldAddClass ? 'add' : 'remove';

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList[method](className);
    }, i * adjustedDelay);
  });
}

function handleClick() {
  startTimer();

  if (isCardDisabled(this)) return;

  this.classList.toggle('card--open');

  if (cardsPair.length > 1) {
    cardsPair.forEach((card) => closeCard(card));
    cardsPair = [];
  }
  if (!isOpen(this)) {
    cardsPair = [];
  }
  if (isOpen(this)) {
    cardsPair.push(this);
  }
  if (cardsPair.length > 1) {
    disableIfMatches();

    if (AllDisabled()) {
      setTimeout(endGame, 300);
    }
  }
}

function endGame() {
  cardsContainerElem.innerHTML = '';
  cardsContainerElem.style.cssText = 'grid-template-columns: repeat(8, 1fr);';

  stopTimer();

  cards = createCards(gameOverMessage, ['card'], false);
  animateCards(cards, 'card--open', true, 5000);
}

function initGame() {
  cardsContainerElem.innerHTML = '';
  cardsPair = [];
  cards = [];
  cardsContainerElem.style.cssText = level.numberOfColumns;

  stopTimer();
  timeElem.innerText = '00:00';

  const randomNumbers = generateRandomNumbers(level.numberOfCards);
  cards = createCards(
    randomNumbers,
    ['card', 'card--hidden', 'card--open'],
    handleClick
  );

  animateCards(cards, 'card--hidden', false, 800);
  setTimeout(() => {
    animateCards(cards, 'card--open', false, 2000);
  }, 1000);
}

initGame();
