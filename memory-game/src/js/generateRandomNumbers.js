function shuffleNumbers(numbers) {
  return numbers.sort(() => Math.random() - 0.5);
}

function generateRandomNumbers(numberOfCards) {
  const arr = [...Array(numberOfCards / 2)];
  const numbersArray = [];

  arr.forEach((_, i) => {
    numbersArray.push(i);
    numbersArray.push(i);
  });
  const shuffledNumbers = shuffleNumbers(numbersArray);

  return shuffledNumbers;
}

export default generateRandomNumbers;
