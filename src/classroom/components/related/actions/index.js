import { apiCall } from '../../../../common-services/api-call';

export const FETCH_RELATED = 'fetch-related';

const url = 'https://pl-backend-development.herokuapp.com/wiki/';


export function fetchRelatedData(data, type) {
  return function(dispatch) {

    let term = '';

    term = data.language_name;

    term = term.trim();
    term = term.replace(/[^a-zA-Z0-9]/g, "_");

    apiCall(`${url}${term}/`, 'get')
    .then(result => {
      if(result.response) {
        result.response.json()
        .then(data => {
          if(data.summary_data.other_links)
          dispatch ({
            type: FETCH_RELATED,
            payload: data.summary_data.other_links
          })
        })
      }
      if(result.error) {

      }
    })
  }
}
