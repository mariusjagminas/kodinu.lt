import { timeElem } from './domElements';
import { CLEAR_TIMER, SET_TIMER } from './store/actions';
import store from './store/store';

function startTimer() {
  if (store.getState().timerOn) return;
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
  store.dispatch({ type: SET_TIMER, timerOn: setInterval(countTime, 1000) });
}

function stopTimer() {
  clearInterval(store.getState().timerOn);

  store.dispatch({
    type: CLEAR_TIMER,
    timerOn: null,
  });
}

export { startTimer, stopTimer };
