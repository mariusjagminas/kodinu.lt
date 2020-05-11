import global from './globalVariables';
import { timeElem } from './domElements';

function startTimer() {
  if (global.timerOn) return;
  const startTime = new Date().getTime();

  function countTime() {
    const timeNow = new Date().getTime();
    const timeElapsed = (timeNow - startTime) / 1000;

    const seconds = parseInt(timeElapsed % 60, 10);
    const minutes = parseInt(timeElapsed / 60, 10) % 60;
    const hours = parseInt(timeElapsed / 3600, 10);

    timeElem.innerText = `${hours > 0 ? hours`:` : ''}${
      minutes > 9 ? '' : 0
    }${minutes}:${seconds > 9 ? '' : 0}${seconds}`;
  }

  global.timerOn = setInterval(countTime, 1000);
}

function stopTimer() {
  clearInterval(global.timerOn);
  global.timerOn = null;
}

export { startTimer, stopTimer };
