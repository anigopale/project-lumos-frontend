import { FETCH_DOMAINS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_DOMAINS:
      return action.payload;
      break;
  }
  return state;
}
