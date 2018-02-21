export const FETCH_WIKIPEDIA = 'fetch-wikipedia';
export const EMPTY_WIKIPEDIA = 'empty-wikipedia';

const url = 'https://pl-backend-development.herokuapp.com/wiki/';

export function wikipediaSearch(term) {
  return function(dispatch) {
    term = term.trim();
    term = term.replace(/ /g,"_");
    term = term.replace(/[^a-zA-Z0-9_]/g, "");
    
    fetch(url + term)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_WIKIPEDIA,
          payload: data
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
