import { FETCH_WIKTIONARY, EMPTY_WIKTIONARY } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_WIKTIONARY:
      return action.payload;
      break;
    case EMPTY_WIKTIONARY:
      return {}
      break;
  }
  return state;
}
