import { language_api } from '../../../common-services/api-endpoints';
import { NAV_CARDS_PER_PAGE } from '../../../common-services/page-size';

export const FETCH_LANGUAGES = 'fetch-languages';
export const DELETE_LANGUAGES = 'delete-languages';
export const ERROR_LANGUAGES = 'error-languages';

export function fetchLanguages(page_token) {
  let url = `${language_api}?page_size=${NAV_CARDS_PER_PAGE}&page=${page_token}`;
  return function(dispatch) {
    fetch(url)
    .then(response => {
      if(response.status !== 200) {
        dispatch({
          type: ERROR_LANGUAGES
        })
      }
      else {
        response.json()
        .then(data => {
          dispatch({
            type: FETCH_LANGUAGES,
            payload: data
          })
        })
      }
    })
    .catch(error => {
      dispatch({
        type: ERROR_LANGUAGES
      })
    })
  }
}

export function deleteLanguages() {
  return {
    type: DELETE_LANGUAGES
  }
}
