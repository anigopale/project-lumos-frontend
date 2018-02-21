export const FETCH_WIKIPEDIA = 'fetch-wikipedia';
export const EMPTY_WIKIPEIDA = 'empty-wikipedia';

const url = 'https://pl-backend-development.herokuapp.com/wiki/';

export function wikipediaSearch(term) {
  return function(dispatch) {
    term = term.trim();
    term = term.replace(/ /g,"_");
    fetch(url + term)
    .then(response => {
      response.json()
      .then(data => {
        console.log(data);
      })
    })
  }
}
