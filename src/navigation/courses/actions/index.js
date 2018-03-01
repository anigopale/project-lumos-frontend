export const FETCH_COURSES = 'fetch-courses';
export const DELETE_COURSES = 'delete-courses';

const video_course_url = `https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/courses/page`;
const link_course_url = `https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/courses/page`;

export function fetchCourses(category, id, page_token, course_type) {
  let url = video_course_url;
  if(course_type === 'links') {
    url = link_course_url;
  }
  return function(dispatch) {
    fetch(`${url}/${page_token}`)
    .then(response => {
      response.json()
      .then(data => {
        console.log(data);
        dispatch({
          type: FETCH_COURSES,
          payload: data
        })
      })
    })
  }
}

export function deleteCourses() {
  return {
    type: DELETE_COURSES
  }
}
