import { domain_api } from '../../../common-services/api-endpoints';

export const FETCH_DOMAINS = 'fetch-domains';

export function fetchDomains() {
  let url = `${domain_api}?domains_for=TS`;
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
