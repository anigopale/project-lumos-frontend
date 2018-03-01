export const FETCH_SOFT_SKILLS = 'fetch-soft-skills';

// API endpoint for soft-skills
const softskills_url = 'https://pl-backend-development.herokuapp.com/api/domain/?domain_for=SS';

export function fetchSoftSkills() {
  return function(dispatch) {
    fetch(softskills_url)
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
