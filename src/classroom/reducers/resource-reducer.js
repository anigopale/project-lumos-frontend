import { FETCH_RESOURCE } from '../actions';

export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_RESOURCE:
      return action.payload;
      break;
  }
  return state;
}
