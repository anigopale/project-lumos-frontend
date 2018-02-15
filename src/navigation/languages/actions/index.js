import languages from './language.json';

export const FETCH_LANGUAGES = 'fetch-languages';

export function fetchLanguages() {
  return function(dispatch) {
    dispatch({
      type: FETCH_LANGUAGES,
      payload: languages.items
    })
  }
}
