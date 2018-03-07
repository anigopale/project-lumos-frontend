import { soft_skill_api } from '../../../common-services/api-endpoints';

export const FETCH_SOFT_SKILLS = 'fetch-soft-skills';

export function fetchSoftSkills(page_token) {
  let url = `${soft_skill_api}?page_size=9&page=${page_token}`;
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
