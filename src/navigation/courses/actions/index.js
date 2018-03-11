import { knowledge_base, soft_skills_data, random_data } from '../../../common-services/api-endpoints';

export const FETCH_COURSES = 'fetch-courses';
export const DELETE_COURSES = 'delete-courses';


export function fetchCourses(course_type, category_id, page_token, filters) {
  return function(dispatch) {
    if(!page_token) {
      page_token = '1';
    }

    // choosing appropriate endpoint for courses
    let category_params = "";
    let url = knowledge_base;
    if(course_type === 'soft-skills') {
      url = soft_skills_data;
    }
    if(course_type === 'random') {
      url = random_data;
    }

    // choosing appropriate category
    if(course_type === 'domains')
      category_params = `&domains=${category_id}`
    if(course_type === 'languages')
      category_params = `&languages=${category_id}`
    if(course_type === 'soft-skills')
      category_params = `&soft_skill=${category_id}`

    // api url for fetching courses
    url = `${url}?page=${page_token}${category_params}`;

    if(filters) {
      // constructing filter API URL if filters exist
      let { skill_level, data_type, paid, project } = filters;
      url = `${url}&paid=${paid}&data_type=${data_type}&project=${project}&skill_level=${skill_level}`;
    }

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
