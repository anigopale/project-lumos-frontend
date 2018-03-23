import {
  knowledge_base,
  random_data,
  soft_skills_data,
  domain_api,
  language_api,
  soft_skill_api
} from '../../../common-services/api-endpoints';
import { KNOWLEDGE_BASE, SOFT_SKILLS, RANDOM } from '../../../common-services/course_types';
import { SEARCH_RESULTS_PER_PAGE } from '../../../common-services/page-size';
import { apiCall } from '../../../common-services/api-call';
import { global_search } from '../../../common-services/api-endpoints';

export const DELETE_SEARCH_RESULTS = 'delete-search-results';
export const FETCH_SEARCH_RESULTS = 'fetch-search-results';
export const NO_SEARCH_RESULTS = 'no-search-results';
export const LOADING_SEARCH_RESULTS = 'loading-search-results';

const soft_skill = 'soft_skill';
const languages = 'languages';
const domains = 'domains';

export function fetchCourses(term) {
  term = term.trim();
  term = term.replace(/[^a-zA-Z0-9]/g, "-");
  term = term.toLowerCase();

  return function(dispatch) {
    let url = `${global_search}?query=${term}&limit=2`;

    apiCall(url, 'get')
    .then(result => {
      result.response.json()
      .then(data => {
        dispatch({
          type: FETCH_SEARCH_RESULTS,
          payload: data
        })
      })
    })
  }
}


export function fetchMoreCourses(api_url, course_type) {
  return function(dispatch) {
    dispatch({
      type: LOADING_SEARCH_RESULTS
    })

    apiCall(api_url, 'get')
    .then(result => {
      result.response.json()
      .then(data => {
        dispatch({
          type: FETCH_SEARCH_RESULTS,
          payload: data
        })
      })
    })

  }
}


export function deleteCourses() {
  return {
    type: DELETE_SEARCH_RESULTS
  }
}
