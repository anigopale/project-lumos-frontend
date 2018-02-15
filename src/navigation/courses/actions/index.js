import courses from './courses.json';

export const FETCH_COURSES = 'fetch-courses';

export function fetchCourses(category, page_token) {

  return {
    type: FETCH_COURSES,
    payload: courses
  }
}
