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
    let requests = [];
    requests.push(fetch(`${domain_api}?slug=${term}`))
    requests.push(fetch(`${language_api}?slug=${term}`))
    requests.push(fetch(`${soft_skill_api}?slug=${term}`))


    Promise.all(requests)
    .then(responses => {
      let count = 0;
      let fetched = false;
      responses.map((response, index) => {

        //setting up url and course_type filter for fetching courses
        let url = knowledge_base;
        let category = domains;
        if(response.url.includes('api/language')) {
          category = languages;
        }
        if(response.url.includes('api/soft-skills')) {
          category = soft_skill;
          url = soft_skills_data;
        }

        response.json()
        .then(data => {
          count += 1;
          if(data.count) {
            fetchData(dispatch, url, category, data.results[0].id);
            fetched = true;
            return;
          }
          else if(count === 3 && fetched === false) {
            // checking if all 3 responses have been mapped && data isn't fetched
            dispatch({
              type: NO_SEARCH_RESULTS
            })
          }
        })
      })
    })
  }
}

function fetchData (dispatch, api_url, category, category_id) {
  let course_type = KNOWLEDGE_BASE;
  if(api_url === soft_skills_data) {
    course_type = SOFT_SKILLS;
  }
    apiCall(`${api_url}?${category}__id=${category_id}&page_size=${SEARCH_RESULTS_PER_PAGE}`, 'get')
    .then(result => {
      if(result.response) {
        result.response.json()
        .then(data => {
          dispatch({
            type: FETCH_SEARCH_RESULTS,
            payload: {
              data,
              course_type
            }
          })
        })
      }
    })

}

export function fetchMoreCourses(api_url, course_type) {
  return function(dispatch) {
    dispatch({
      type: LOADING_SEARCH_RESULTS
    })
    apiCall(api_url, 'get')
    .then(result => {
      if(result.response) {
        result.response.json()
        .then(data => {
          dispatch({
            type: FETCH_SEARCH_RESULTS,
            payload: {
              data,
              course_type
            }
          })
        })
      }
    })
  }
}


export function deleteCourses() {
  return {
    type: DELETE_SEARCH_RESULTS
  }
}
