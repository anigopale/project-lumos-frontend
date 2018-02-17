import { SELECT_VIDEO } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_VIDEO:
      return action.payload;
      break;
  }
  return state;
}
