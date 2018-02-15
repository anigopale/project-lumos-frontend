import domains from './domain.json';

export const FETCH_DOMAINS = 'fetch-domains';

export function fetchDomains() {
  return function(dispatch) {
    dispatch({
      type: FETCH_DOMAINS,
      payload: domains.items
    })
  }
}
