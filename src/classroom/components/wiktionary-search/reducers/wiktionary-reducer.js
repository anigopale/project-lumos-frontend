import { FETCH_WIKTIONARY, EMPTY_WIKTIONARY, ERROR_WIKTIONARY } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_WIKTIONARY:
      return action.payload;
      break;
    case EMPTY_WIKTIONARY:
      return {};
      break;
    case ERROR_WIKTIONARY:
      return {
        error: 'An error occured'
      };
      break;
  }
  return state;
}
