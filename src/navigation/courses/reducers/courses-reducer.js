import { FETCH_COURSES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COURSES:
      return action.payload;
      break;

  }
  return state;
}
