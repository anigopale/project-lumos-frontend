import { knowledge_base, soft_skills_data, random_data } from '../../common-services/api-endpoints';
import { RANDOM, SOFT_SKILLS } from '../../common-services/course_types';
import { apiCall } from '../../common-services/api-call';

export const FETCH_COURSE = 'fetch-course';
export const ERROR_COURSE = 'error-course';
export const DELETE_COURSE = 'delete-course';

export function fetchResource(course_id, course_type) {
  let url = knowledge_base;
  if(course_type === SOFT_SKILLS) {
    url = soft_skills_data;
  } else if (course_type === RANDOM) {
    url = random_data;
  }

  return function(dispatch) {
    apiCall(`${url}${course_id}/`, 'get')
    .then(result => {
      if(result.response) {
        result.response.json()
        .then(data => {
          dispatch({
            type: FETCH_COURSE,
            payload: data
          })
        })
      }
      if(result.error) {
        dispatch({
          type: ERROR_COURSE
        })
      }
    })
  }
}


export function deleteResource() {
  return {
    type: DELETE_COURSE
  }
}
