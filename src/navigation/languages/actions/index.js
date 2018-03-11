import { language_api } from '../../../common-services/api-endpoints';
import { NAV_CARDS_PER_PAGE } from '../../../common-services/page-size';

export const FETCH_LANGUAGES = 'fetch-languages';
export const DELETE_LANGUAGES = 'delete-languages';

export function fetchLanguages(page_token) {
  let url = `${language_api}?page_size=${NAV_CARDS_PER_PAGE}&page=${page_token}`;
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

export function deleteLanguages() {
  return {
    type: DELETE_LANGUAGES
  }
}
