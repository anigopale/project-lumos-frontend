import { FETCH_LANGUAGES, DELETE_LANGUAGES, ERROR_LANGUAGES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_LANGUAGES:
      return action.payload;
      break;
    case DELETE_LANGUAGES:
      return {};
      break;
    case ERROR_LANGUAGES:
      return {
        error: 'error'
      }
      break;
  }
  return state;
}
