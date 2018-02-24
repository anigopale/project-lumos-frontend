export const FETCH_WIKIPEDIA = 'fetch-wikipedia';
export const EMPTY_WIKIPEDIA = 'empty-wikipedia';
export const ERROR_WIKIPEDIA = 'error-wikipedia';

const url = 'https://pl-backend-development.herokuapp.com/wiki/';

export function wikipediaSearch(term) {
  return function(dispatch) {
    term = term.trim();
    term = term.replace(/[^a-zA-Z0-9]/g, "_");

    fetch(url + term)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_WIKIPEDIA,
          payload: data
        })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WIKIPEDIA
        })
      })
    })
  }
}

export function emptyReducer() {
  return {
    type: EMPTY_WIKIPEDIA
  }
}
