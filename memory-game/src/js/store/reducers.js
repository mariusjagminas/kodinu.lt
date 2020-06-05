import { combineReducers } from 'redux';
import {
  CHANGE_LEVEL,
  SET_TIMER,
  CLEAR_TIMER,
  DELETE_CARDS,
  ADD_CARDS,
  PUSH_CARD_TO_CARDS_PAIR,
  FLUSH_CARDS_PAIR,
} from './actions';

const initialLevel = {
  numberOfCards: 16,
  numberOfColumns: 'grid-template-columns: repeat(4,1fr);',
};

const level = (state = initialLevel, action) => {
  switch (action.type) {
    case CHANGE_LEVEL:
      return {
        numberOfCards: action.numberOfCards,
        numberOfColumns: action.numberOfColumns,
      };
    default:
      return state;
  }
};

const timerOn = (state = null, action) => {
  switch (action.type) {
    case SET_TIMER:
      return action.timerOn;
    case CLEAR_TIMER:
      return null;
    default:
      return state;
  }
};

const cards = (state = [], action) => {
  switch (action.type) {
    case DELETE_CARDS:
      return [];
    case ADD_CARDS:
      return [...action.cards];
    default:
      return state;
  }
};

const cardsPair = (state = [], action) => {
  switch (action.type) {
    case PUSH_CARD_TO_CARDS_PAIR:
      return [...state.concat(action.card)];
    case FLUSH_CARDS_PAIR:
      return [];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  level,
  timerOn,
  cards,
  cardsPair,
});

export default rootReducer;
