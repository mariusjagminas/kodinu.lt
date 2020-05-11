import global from './globalVariables';
import initGame from './initGame';

function changeLevel(e) {
  switch (e.target.value) {
    case 'easy':
      global.level = {
        numberOfCards: 16,
        numberOfColumns: 'grid-template-columns: repeat(4, 1fr);',
      };
      initGame();
      break;
    case 'medium':
      global.level = {
        numberOfCards: 36,
        numberOfColumns: 'grid-template-columns: repeat(6, 1fr);',
      };
      initGame();
      break;
    case 'pro':
      global.level = {
        numberOfCards: 64,
        numberOfColumns: 'grid-template-columns: repeat(8, 1fr);',
      };
      initGame();
      break;
    default:
  }
}

export default changeLevel;
