import {
  knowledge_base,
  random_data,
  soft_skills_data,
  domain_api,
  language_api,
  soft_skill_api
} from '../../../common-services/api-endpoints';

export const DELETE_SEARCH_RESULTS = 'delete-search-results';
export const FETCH_SEARCH_RESULTS = 'fetch-search-results';

const soft_skill = 'soft_skill';
const languages = 'languages';
const domains = 'domains';


export function fetchCourses(term) {
  return function(dispatch) {
    term = term.trim();
    term = term.replace(/[^a-zA-Z0-9]/g, "-");

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

function fetchData(dispatch, api_url, category, category_id) {
  fetch(`${api_url}?${category}=${category_id}`)
  .then(response => {
    response.json()
    .then(data => {
      console.log(data);
      dispatch({
        type: FETCH_SEARCH_RESULTS,
        payload: data
      })
    })
  })
}


export function deleteCourses() {
  return DELETE_SEARCH_RESULTS
}
