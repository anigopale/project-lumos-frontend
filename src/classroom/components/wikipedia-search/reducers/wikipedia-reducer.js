import { FETCH_WIKIPEDIA, EMPTY_WIKIPEDIA } from '../actions';

export default function( state = {}, action) {
  switch (action.type) {
    case FETCH_WIKIPEDIA:
      return action.payload;
      break;
    case EMPTY_WIKIPEDIA:
      return {};
  }
  return state;
}
