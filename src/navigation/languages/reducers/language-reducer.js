import { FETCH_LANGUAGES } from '../actions';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_LANGUAGES:
      return action.payload
      break;
  }
  return state;
}
