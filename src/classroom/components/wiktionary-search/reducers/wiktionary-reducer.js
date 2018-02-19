import { FETCH_WIKTIONARY } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_WIKTIONARY:
      return action.payload;
      break;

  }
  return state;
}
