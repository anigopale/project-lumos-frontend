import {
  FETCH_COURSES,
  DELETE_COURSES,
  ERROR_COURSES,
  APPEND_COURSES,
  LOADING_APPEND_COURSES,
  ERROR_APPEND_COURSES
} from '../actions';

export default function(state = { results: null, next: '', loading: false }, action) {
  // course page renders loader if state.loaing == true
  switch (action.type) {
    case FETCH_COURSES:
      return {
        results: action.payload.results,
        next: action.payload.next,
        loading: false
      };
      break;

    case DELETE_COURSES:
      return {};
      break;

    case ERROR_COURSES:
      return {
        error: 'error'
      }
      break;

    case LOADING_APPEND_COURSES:
      return {
        results: state.results,
        next: state.next,
        loading: true
      };
      break;

    case APPEND_COURSES:
      let { results, next } = state;
      results = [...results, ...action.payload.results];
      next = action.payload.next;
      return {
        results,
        next,
        loading: false
      };
      break;
    case ERROR_APPEND_COURSES:
      return {
        results: state.results,
        next: state.next,
        loading: false
      }

  }
  return state;
}
