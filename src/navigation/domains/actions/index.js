import { domain_api } from '../../../common-services/api-endpoints';

export const FETCH_DOMAINS = 'fetch-domains';

export function fetchDomains(page_token) {
  let url = `${domain_api}?page_size=9&page=${page_token}`;
  return function(dispatch) {
    fetch(url)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_DOMAINS,
          payload: data
        })
      })
    })
  }
}
