import domains from './domain.json';

export function fetchDomains() {
  return function(dispatch) {
    domains.items.map(domain => {
      console.log(domain);
    })
  }
}
