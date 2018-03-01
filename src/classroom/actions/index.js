export const FETCH_COURSE = 'fetch-course';
export const ERROR_COURSE = 'error-course';

const video_course_url = 'https://pl-backend-development.herokuapp.com/api/video';
const link_course_url = 'https://pl-backend-development.herokuapp.com/api/externallink';

export function fetchResource(course_id, course_type) {
  let url = video_course_url;
  if(course_type === 'link') {
    url = link_course_url;
  }

  return function(dispatch) {
    fetch(`${url}/${course_id}/`)
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
