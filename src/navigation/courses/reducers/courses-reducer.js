import { FETCH_COURSES, DELETE_COURSES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COURSES:
      return action.payload;
      break;
    case DELETE_COURSES:
      return {};
      break;
  }
  return state;
}
