import { FETCH_SOFT_SKILLS, DELETE_SOFT_SKILLS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SOFT_SKILLS:

      return action.payload
      break;
    case DELETE_SOFT_SKILLS:
      return {};
      break;
  }
  return state;
}
