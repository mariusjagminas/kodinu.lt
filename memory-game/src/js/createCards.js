import { cardsContainerElem } from './domElements';

function appendCards(cards) {
  cards.forEach((card) => cardsContainerElem.appendChild(card));
}

function createCards(itemsArr, classNames, eventHandler = null) {
  const cardsNodesArr = [];
  const cardTemplate = document.querySelector('#card-template');

  itemsArr.forEach((item) => {
    const tmpl = cardTemplate.content.cloneNode(true);
    const div = tmpl.children[0];

    div.classList.add(...classNames);
    div.setAttribute('data-card', item);

    if (eventHandler) {
      div.addEventListener('click', eventHandler);
    }

    div.children[1].children[0].innerText = item;

    cardsNodesArr.push(div);
  });
  appendCards(cardsNodesArr);

  return cardsNodesArr;
}

export default createCards;
