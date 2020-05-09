function animateCards(cards, className, shouldAddClass, delay) {
  const adjustedDelay = delay / (cards.length * 3);
  const method = shouldAddClass ? 'add' : 'remove';

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList[method](className);
    }, i * adjustedDelay);
  });
}

export default animateCards;
