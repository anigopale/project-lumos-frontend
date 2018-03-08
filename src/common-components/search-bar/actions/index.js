import {
  knowledge_base,
  random_data,
  soft_skills_data,
  domain_api,
  language_api,
  soft_skill_api
} from '../../../common-services/api-endpoints';
import { KNOWLEDGE_BASE, SOFT_SKILLS, RANDOM } from '../../../common-services/course_types';

export const DELETE_SEARCH_RESULTS = 'delete-search-results';
export const FETCH_SEARCH_RESULTS = 'fetch-search-results';

const soft_skill = 'soft_skill';
const languages = 'languages';
const domains = 'domains';


export function fetchCourses(term) {
  term = term.trim();
  term = term.replace(/[^a-zA-Z0-9]/g, "-");

  return function(dispatch) {

    fetch(`${domain_api}?slug=${term}`)
    .then(response => {
      response.json()
      .then(data => {
        if(data.count) {
          fetchData(dispatch, knowledge_base, domains, data.results[0].id);
        }
      })
    })

    fetch(`${language_api}?slug=${term}`)
    .then(response => {
      response.json()
      .then(data => {
        if(data.count) {
          fetchData(dispatch, knowledge_base, languages, data.results[0].id);
        }
      })
    })

    fetch(`${soft_skill_api}?slug=${term}`)
    .then(response => {
      response.json()
      .then(data => {
        if(data.count) {
          fetchData(dispatch, soft_skills_data, soft_skill, data.results[0].id);
        }
      })
    })
  }
}

function fetchData (dispatch, api_url, category, category_id) {
  let course_type = KNOWLEDGE_BASE;
  if(api_url === soft_skills_data) {
    course_type = SOFT_SKILLS;
  }
    fetch(`${api_url}?${category}=${category_id}&page_size=`)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_SEARCH_RESULTS,
          payload: {
            data,
            course_type
          }
        })
      })
    })
}


export function deleteCourses() {
  return DELETE_SEARCH_RESULTS
}
