import languages from './language.json';

export const FETCH_LANGUAGES = 'fetch-languages';

const url = 'https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/languages';

export function fetchLanguages() {
  return function(dispatch) {
    fetch(url)
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
