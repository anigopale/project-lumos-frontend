import { language_api } from '../../../common-services/api-endpoints';

export const FETCH_LANGUAGES = 'fetch-languages';

export function fetchLanguages(page_token) {
  let url = `${language_api}?page_size=9&page=${page_token}`;
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
