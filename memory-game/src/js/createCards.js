import { cardsContainerElem } from './domElements';

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

export default createCards;
