import languages from './language.json';

export const FETCH_LANGUAGES = 'fetch-languages';

export function fetchLanguages() {
  return function(dispatch) {
    languages.items.map((language) => {
      console.log(language);
    })
  }
}
