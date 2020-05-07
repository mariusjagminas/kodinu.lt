import '../styles/main.scss';

const cardsBoard = document.querySelector('.cards-board');
const btn = document.querySelector('.btn');
const select = document.querySelector('#level');
const time = document.querySelector('.game__time');

btn.addEventListener('click', resetGame);
select.addEventListener('change', changeLevel);

let cards = [];
let cardsPair = [];
let level = {
  number: 8,
  styles: 'grid-template-columns: auto auto auto auto;',
};
let timer = null;
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
        number: 8,
        styles: 'grid-template-columns: auto auto auto auto;',
      };
      initGame();
      break;
    case 'medium':
      level = {
        number: 18,
        styles: 'grid-template-columns: auto auto auto auto auto auto;',
      };
      initGame();
      break;
    case 'pro':
      level = {
        number: 32,
        styles:
          'grid-template-columns: auto auto auto auto auto auto auto auto;',
      };
      initGame();
      break;
  }
}

function createCardsNumbers(length) {
  const array = [...Array(length)];
  let numbersArray = [];

  array.forEach((_, i) => {
    numbersArray.push(i);
    numbersArray.push(i);
  });

  return numbersArray;
}

function shuffleNumbers(numbers) {
  return numbers.sort(() => Math.random() - 0.5);
}

function createCards(itemsArr, classNames) {
  let cardsNodesArr = [];

  itemsArr.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add(...classNames);
    div.setAttribute('data-card', item);
    div.addEventListener('click', handleClick);
    div.innerHTML = `
    <div class="card__frontface"></div>
    <div class="card__backface">
      <span class="card__number">${item}</span>
    </div>
  `;
    cardsNodesArr.push(div);
  });
  return cardsNodesArr;
}

function addCardsToBoard(cards) {
  cards.forEach((card) => cardsBoard.appendChild(card));
  cards = cards;
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

function isAllDisabled() {
  const result = cards.filter(
    (card) => !card.classList.contains('card--inactive')
  );
  return result.length === 0;
}

function startTimer() {
  if (timer) return;

  const startTime = new Date().getTime();
  timer = setInterval(countTime, 1000);

  function countTime() {
    const timeNow = new Date().getTime();
    const timeElapsed = (timeNow - startTime) / 1000;

    const seconds = parseInt(timeElapsed % 60);
    const minutes = parseInt(timeElapsed / 60) % 60;
    const hours = parseInt(timeElapsed / 3600);

    time.innerText = `${hours > 0 ? hours + ':' : ''}${
      minutes > 9 ? '' : 0
    }${minutes}:${seconds > 9 ? '' : 0}${seconds}`;
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function animate(cards, className, shouldAddClass, delay) {
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

    if (isAllDisabled()) {
      setTimeout(endGame, 500);
    }
  }
}

function endGame() {
  cardsBoard.innerHTML = '';
  cardsBoard.style.cssText =
    'grid-template-columns: auto auto auto auto auto auto auto auto;';
  cards = createCards(gameOverMessage, ['card']);
  animate(cards, 'card--open', true, 5000);
  addCardsToBoard(cards);
  stopTimer();
}

function initGame() {
  cardsBoard.innerHTML = '';
  cardsPair = [];
  cards = [];
  cardsBoard.style.cssText = level.styles;
  stopTimer();
  time.innerText = '00:00';
  const cardsNumbers = createCardsNumbers(level.number);
  const shuffledNumbers = shuffleNumbers(cardsNumbers);
  cards = createCards(shuffledNumbers, ['card', 'card--hidden', 'card--open']);
  addCardsToBoard(cards);
  animate(cards, 'card--hidden', false, 800);
  setTimeout(() => {
    animate(cards, 'card--open', false, 2000);
  }, 1200);
}

initGame();
