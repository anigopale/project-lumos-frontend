export const FETCH_WIKTIONARY = 'fetch-wiktionary';
export const EMPTY_WIKTIONARY = 'empty-wiktionary';

const url = 'https://pl-backend-development.herokuapp.com/dict/';

export function wiktionarySearch(term) {
  return function(dispatch) {
    term = term.trim();
    term = term.replace(/ /g,"_");
    term = term.replace(/[^a-zA-Z0-9_]/g, "");
    fetch(url + term)
    .then((response) => {
      response.json()
      .then((data) => {
        console.log(data);
        if(data.term_meaning) {
          dispatch({
            type: FETCH_WIKTIONARY,
            payload: data
          })
        }
        else {
          dispatch({
            type: FETCH_WIKTIONARY,
            payload: {
              error: 'no meaning found'
            }
          })
        }
      })
    })
  }
}

export function emptyReducer() {
  return {
    type: EMPTY_WIKTIONARY
  }
}
