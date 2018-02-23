import domains from './domain.json';

export const FETCH_DOMAINS = 'fetch-domains';

const url = 'https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/domains/tech';

export function fetchDomains() {
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
