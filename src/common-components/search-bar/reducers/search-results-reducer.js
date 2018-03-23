import { FETCH_SEARCH_RESULTS, DELETE_SEARCH_RESULTS, NO_SEARCH_RESULTS, LOADING_SEARCH_RESULTS } from '../actions';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../../../common-services/course_types';

export default function(state = { next: 'null', course_type: 'none', results: [], loading: false }, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      let { next } = action.payload;
      let results = [ ...state.results ];
      let { KnowledgeBase, SoftSkillsData, RandomData } = action.payload.results;
      let resources = { KnowledgeBase, SoftSkillsData, RandomData };

      Object.keys(resources).map((key => {
        resources[key].map(course => {
          let course_type = '';

          // constructing list of objects with keys 'course_type' and 'data'
          // where 'course_type' is used for redirect URL construction
          if(key === 'KnowledgeBase')
            course_type = KNOWLEDGE_BASE;
          if(key === 'SoftSkillsData')
            course_type = SOFT_SKILLS;
          if(key === 'RandomData')
            course_type = RANDOM;

          results = [
            ...results,
            {
              course_type,
              data: course
            }
          ]
        })
      }))
      state = { next, course_type: '', results, loading: false }
      return state;
      break;

    case DELETE_SEARCH_RESULTS:
      return { next: null, course_type: 'none', results: [], loading: false };
      break;
    case NO_SEARCH_RESULTS:
      return { next: null, course_type: 'not-found', results: [], loading: false };
      break;
    case LOADING_SEARCH_RESULTS:
      return {
        next: state.next,
        course_type: state.course_type,
        results: state.results,
        loading: true
      }
      break;

  }
  return state;
}
