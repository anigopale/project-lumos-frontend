import { FETCH_RESOURCE, ERROR_RESOURCE } from '../actions';

export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_RESOURCE:
      return action.payload;
      break;
    case ERROR_RESOURCE:
      return {
        error: 'An error occured'
      }
      break;
  }
  return state;
}
