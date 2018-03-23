import { FETCH_SEARCH_RESULTS, DELETE_SEARCH_RESULTS, NO_SEARCH_RESULTS, LOADING_SEARCH_RESULTS } from '../actions';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS, DOMAINS, LANGUAGES } from '../../../common-services/course_types';

export default function(state = { next: 'null', course_type: 'none', results: [], domain_tags: [], language_tags: [], softskill_tags: [], loading: false }, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      let { next } = action.payload;
      let { results, tags, domain_tags, language_tags, softskill_tags } = state;
      let { KnowledgeBase, SoftSkillsData, RandomData } = action.payload.results;
      let resources = { KnowledgeBase, SoftSkillsData, RandomData };
      let { Language, Domain, SoftSkills } = action.payload.results;
      let tagObject = { Language, Domain, SoftSkills };

      Object.keys(tagObject).map((key => {
        tagObject[key].map(tag => {
          let name = '';
          let url = '';
          // constructing tags (list of objects) with keys 'url' and 'name'
          // where 'url' is redirect URL
          if(key === 'Language') {
            url = `/technical/languages/${tag.id}`;
            name = tag.language_name;
            language_tags = [
              ...language_tags,
              {
                url,
                name
              }
            ]
          }
          if(key === 'Domain') {
            url = `/technical/domains/${tag.id}`;
            name = tag.domain_name;
            domain_tags = [
              ...domain_tags,
              {
                url,
                name
              }
            ]
          }
          if(key === 'SoftSkills') {
            url = `/soft-skills/${tag.id}`;
            name = tag.soft_skill_category;
            softskill_tags = [
              ...softskill_tags,
              {
                url,
                name
              }
            ]
          }
        })
      }))

      Object.keys(resources).map((key => {
        resources[key].map(course => {
          let course_type = '';

          // constructing results (list of objects) with keys 'course_type' and 'data'
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
      state = { next, course_type: '', results, domain_tags, language_tags, softskill_tags, loading: false }
      return state;
      break;

    case DELETE_SEARCH_RESULTS:
      return { next: null, course_type: 'none', results: [], domain_tags: [], language_tags: [], softskill_tags: [], loading: false };
      break;
    case NO_SEARCH_RESULTS:
      return { next: null, course_type: 'not-found', results: [], domain_tags: [], language_tags: [], softskill_tags: [], loading: false };
      break;
    case LOADING_SEARCH_RESULTS:
      return {
        next: state.next,
        course_type: state.course_type,
        results: state.results,
        domain_tags: state.domain_tags,
        language_tags: state.language_tags,
        softskill_tags: state.softskill_tags,
        loading: true
      }
      break;

  }
  return state;
}
