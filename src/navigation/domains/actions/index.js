export const FETCH_DOMAINS = 'fetch-domains';

// API endpoint for domains
const domain_url = 'https://pl-backend-development.herokuapp.com/api/domain/?domain_for=TS';

export function fetchDomains() {
  return function(dispatch) {
    fetch(domain_url)
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
