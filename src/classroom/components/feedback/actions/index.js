import { knowledge_base_rating, random_data_rating, softskills_data_rating } from '../../../../common-services/api-endpoints';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../../../../common-services/course_types';
import { apiCall } from '../../../../common-services/api-call';

export function postRating(id, type, rating) {
  return function(dispatch) {
    let url = '';
    let data = {};

    if(type === KNOWLEDGE_BASE)
      url = knowledge_base_rating;
    if(type === RANDOM)
      url = random_data_rating;
    if(type === SOFT_SKILLS)
      url = softskills_data_rating;

    console.log(id, type, url);
    data = { user: null, resource: id, ...rating };

    apiCall(url, 'post', data)
    .then(results => {
      console.log(results);
    })
  }
}
