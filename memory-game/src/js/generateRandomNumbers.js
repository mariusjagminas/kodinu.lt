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

export default generateRandomNumbers;
