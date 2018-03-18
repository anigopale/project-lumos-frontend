import { FETCH_RELATED } from '../actions';

export default function( state = {}, action) {
  switch (action.type) {
    case FETCH_RELATED:
      return action.payload;
      break;
  }
  return state;
}
