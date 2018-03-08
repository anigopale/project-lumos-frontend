import { FETCH_SEARCH_RESULTS, DELETE_SEARCH_RESULTS, NO_SEARCH_RESULTS } from '../actions';

export default function(state = { next: null, course_type: 'none', results: [] }, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      let { next, results } = action.payload.data;
      let { course_type } = action.payload;
      state = { next, course_type, results: [...state.results, ...results] }
      return state;
      break;

    case DELETE_SEARCH_RESULTS:
      return { next: null, course_type: 'none', results: [] };
      break;
    case NO_SEARCH_RESULTS:
      return { next: null, course_type: 'not-found', results: [] };
      break;
  }
  return state;
}
