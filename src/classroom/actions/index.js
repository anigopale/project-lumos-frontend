import { video_course_api, link_course_api } from '../../common-services/api-endpoints';

export const FETCH_COURSE = 'fetch-course';
export const ERROR_COURSE = 'error-course';

export function fetchResource(course_id, course_type) {
  let url = video_course_api;
  if(course_type === 'link') {
    url = link_course_api;
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
