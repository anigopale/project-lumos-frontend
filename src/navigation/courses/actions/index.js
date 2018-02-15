import courses from './courses.json';

export const FETCH_COURSES = 'fetch-courses';

export function fetchCourses(category, page_token) {
  courses.items.map((course) => {
    console.log(course);
  })
  return {
    type: FETCH_COURSES
  }
}
