import store from './store/store';
import { CHANGE_LEVEL } from './store/actions';
import initGame from './initGame';

function changeLevel(e) {
  switch (e.target.value) {
    case 'easy':
      store.dispatch({
        type: CHANGE_LEVEL,
        numberOfCards: 16,
        numberOfColumns: 'grid-template-columns: repeat(4, 1fr);',
      });
      initGame();
      break;
    case 'medium':
      store.dispatch({
        type: CHANGE_LEVEL,
        numberOfCards: 36,
        numberOfColumns: 'grid-template-columns: repeat(6, 1fr);',
      });
      initGame();
      break;
    case 'pro':
      store.dispatch({
        type: CHANGE_LEVEL,
        numberOfCards: 64,
        numberOfColumns: 'grid-template-columns: repeat(8, 1fr);',
      });
      initGame();
      break;
    default:
      initGame();
  }
}

export default changeLevel;
