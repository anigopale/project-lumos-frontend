import courses from './courses.json';

export const FETCH_COURSES = 'fetch-courses';

const url = `https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/courses/page`;

export function fetchCourses(category, id, page_token) {
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
