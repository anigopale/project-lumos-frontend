import { apiCall } from '../../../../common-services/api-call';

export const FETCH_WIKIPEDIA = 'fetch-wikipedia';
export const EMPTY_WIKIPEDIA = 'empty-wikipedia';
export const ERROR_WIKIPEDIA = 'error-wikipedia';

const url = 'https://pl-backend-development.herokuapp.com/wiki/';

export function wikipediaSearch(term) {
  return function(dispatch) {
    term = term.trim();

    // removing all special characters except for <space>
    term = term.replace(/[^a-zA-Z0-9 ]/g, "");

    // replacing spaces with "_"
    term = term.replace(/[^a-zA-Z0-9]/g, "_");

    apiCall(`${url}${term}/`, 'get')
    .then(result => {
      if(result.response) {
        result.response.json()
        .then(data => {
          dispatch({
            type: FETCH_WIKIPEDIA,
            payload: data
          })
        })
      }
      if(result.error) {
        dispatch({
          type: ERROR_WIKIPEDIA
        })
      }
    })
  }
}

export function emptyReducer() {
  return {
    type: EMPTY_WIKIPEDIA
  }
}
