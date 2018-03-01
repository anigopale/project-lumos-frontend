import { domain_api } from '../../../common-services/api-endpoints';

export const FETCH_SOFT_SKILLS = 'fetch-soft-skills';

export function fetchSoftSkills() {
  let url = `${domain_api}?domains_for=SS`;
  return function(dispatch) {
    fetch(url)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_SOFT_SKILLS,
          payload: data
        })
      })
    })
  }
}
