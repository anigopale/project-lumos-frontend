export const FETCH_SOFT_SKILLS = 'fetch-soft-skills';

// API endpoint for soft-skills
const url = 'https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/domains/nontech';

export function fetchSoftSkills() {
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
