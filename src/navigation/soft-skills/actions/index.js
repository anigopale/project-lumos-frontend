import { soft_skill_api } from '../../../common-services/api-endpoints';
import { NAV_CARDS_PER_PAGE } from '../../../common-services/page-size';

export const FETCH_SOFT_SKILLS = 'fetch-soft-skills';
export const DELETE_SOFT_SKILLS = 'delete-soft-skills';

export function fetchSoftSkills(page_token) {
  let url = `${soft_skill_api}?page_size=${NAV_CARDS_PER_PAGE}&page=${page_token}`;
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

export function deleteSoftSkills() {
  return {
    type: DELETE_SOFT_SKILLS
  }
}
