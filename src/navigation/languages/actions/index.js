export const FETCH_LANGUAGES = 'fetch-languages';

// API endpoint for languages
const language_url = 'https://pl-backend-development.herokuapp.com/api/language/?languages_for=TS';

export function fetchLanguages() {
  return function(dispatch) {
    fetch(language_url)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_LANGUAGES,
          payload: data
        })
      })
    })
  }
}
