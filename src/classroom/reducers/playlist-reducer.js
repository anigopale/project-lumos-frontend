import { FETCH_PLAYLIST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYLIST:
      return action.payload;
      break;

  }
  return state;
}
