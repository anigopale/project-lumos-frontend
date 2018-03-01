import { language_api } from '../../../common-services/api-endpoints';

export const FETCH_LANGUAGES = 'fetch-languages';

export function fetchLanguages() {
  let url = `${language_api}?languages_for=TS`;
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
