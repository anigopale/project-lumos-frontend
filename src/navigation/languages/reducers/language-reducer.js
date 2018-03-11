import { FETCH_LANGUAGES, DELETE_LANGUAGES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_LANGUAGES:
      return action.payload;
      break;
    case DELETE_LANGUAGES:
      return {};
      break;
  }
  return state;
}
