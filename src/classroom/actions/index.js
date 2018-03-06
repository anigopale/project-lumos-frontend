import { knowledge_base, soft_skills_data, random_data } from '../../common-services/api-endpoints';

export const FETCH_COURSE = 'fetch-course';
export const ERROR_COURSE = 'error-course';

export function fetchResource(course_id, course_type) {
  let url = knowledge_base;
  if(course_type === 'soft-skills') {
    url = soft_skills_data;
  } else if (course_type === 'random') {
    url = random_data;
  }

  return function(dispatch) {
    fetch(`${url}${course_id}/`)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_COURSE,
          payload: data
        });
      })
    })
    .catch(error => {
      dispatch({
        type: ERROR_COURSE
      })
    })
  }
}
