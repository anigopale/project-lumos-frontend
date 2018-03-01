import { video_course_api, link_course_api, domain_api, language_api } from '../../../common-services/api-endpoints';

export const FETCH_COURSES = 'fetch-courses';
export const DELETE_COURSES = 'delete-courses';


export function fetchCourses(category, id, page_token, course_type) {
  return function(dispatch) {
    let url = video_course_api;
    if(course_type === 'links') {
      url = link_course_api;
    }
    if(category === 'domain' || category === 'softskills') {
      category = 'domains';
    }
    else {
      category = 'languages';
    }

    // api url for fetching courses
    url = `${url}?${category}=${id}`;

    fetch(`${url}`)
    .then(response => {
      response.json()
      .then(data => {
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
