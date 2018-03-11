import { FETCH_DOMAINS, DELETE_DOMAINS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_DOMAINS:
      return action.payload;
      break;
    case DELETE_DOMAINS:
      return {};
      break;
  }
  return state;
}
