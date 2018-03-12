import { domain_api } from '../../../common-services/api-endpoints';
import { NAV_CARDS_PER_PAGE } from '../../../common-services/page-size';

export const FETCH_DOMAINS = 'fetch-domains';
export const DELETE_DOMAINS = 'delete-domains';
export const ERROR_DOMAINS = 'error-domains';

export function fetchDomains(page_token) {
  let url = `${domain_api}?page_size=${NAV_CARDS_PER_PAGE}&page=${page_token}`;
  return function(dispatch) {
    fetch(url)
    .then(response => {
      if(response.status !== 200) {
        dispatch({
          type: ERROR_DOMAINS
        })
      }
      else {
        response.json()
        .then(data => {
          dispatch({
            type: FETCH_DOMAINS,
            payload: data
          })
        })
      }
    })
    .catch(error => {
      dispatch({
        type: ERROR_DOMAINS
      })
    })
  }
}

export function deleteDomains() {
  return {
    type: DELETE_DOMAINS
  }
}
