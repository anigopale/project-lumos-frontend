import { FETCH_SEARCH_RESULTS, DELETE_SEARCH_RESULTS, NO_SEARCH_RESULTS, LOADING_SEARCH_RESULTS } from '../actions';

export default function(state = { next: null, course_type: 'none', results: [], loading: false }, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      let { next, results } = action.payload.data;
      let { course_type } = action.payload;
      state = { next, course_type, results: [...state.results, ...results], loading: false }
      return state;
      break;

    case DELETE_SEARCH_RESULTS:
      return { next: null, course_type: 'none', results: [], loading: false };
      break;
    case NO_SEARCH_RESULTS:
      return { next: null, course_type: 'not-found', results: [], loading: false };
      break;
    case LOADING_SEARCH_RESULTS:
      return {
        next: state.next,
        course_type: state.course_type,
        results: state.results,
        loading: true
      }
      break;

  }
  return state;
}
