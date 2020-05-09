import { resetButtonElem, optionsElem } from './domElements';
import initGame from './initGame';
import changeLevel from './changeLevel';

function initEventListeners() {
  resetButtonElem.addEventListener('click', initGame);
  optionsElem.addEventListener('change', changeLevel);
}

export default initEventListeners;
