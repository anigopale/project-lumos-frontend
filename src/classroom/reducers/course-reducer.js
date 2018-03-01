import { FETCH_COURSE, ERROR_COURSE } from '../actions';

export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_COURSE:
      return action.payload;
      break;
    case ERROR_COURSE:
      return {
        error: 'An error occured'
      }
      break;
  }
  return state;
}
