import Cookies from 'universal-cookie';
import { knowledge_base_rating, random_data_rating, softskills_data_rating } from '../../../../common-services/api-endpoints';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../../../../common-services/course_types';
import { apiCall } from '../../../../common-services/api-call';

const cookies = new Cookies();
const ratingLimit = 1;

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

    // setting up data object for post request
    data = { user: null, resource: id, ...rating };

    let timesRated = cookies.get('timesRated');

    // checking if 'timesRated' cookie is less than ratingLimit
    if(timesRated < ratingLimit || !timesRated) {
      apiCall(url, 'post', data)
      .then(results => {
        // set/update cookie only if status is '201'
        if(results.response.status === 201) {
          let num = timesRated ? timesRated++ : '1';
          cookies.set('timesRated', num, { path: '/' });
        }
      })
    }
  }
}
