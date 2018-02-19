export const FETCH_WIKTIONARY = 'fetch-wiktionary';

let url = 'https://pl-backend-staging.herokuapp.com/dict/';

export function wiktionarySearch(term) {
  return function(dispatch) {
    term = term.trim();
    term = term.replace(/ /g,"_");
    fetch(url + term)
    .then((response) => {
      response.json()
      .then((data) => {
        dispatch({
          type: FETCH_WIKTIONARY,
          payload: data
        })
      })
    })
  }
}
