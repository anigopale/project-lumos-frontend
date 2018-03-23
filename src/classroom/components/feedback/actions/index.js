import Cookies from 'universal-cookie';
import { knowledge_base_rating, random_data_rating, softskills_data_rating } from '../../../../common-services/api-endpoints';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../../../../common-services/course_types';
import { apiCall } from '../../../../common-services/api-call';

const cookies = new Cookies();
const ratingLimit = 3;

export function postRating(id, type, rating, path) {
  return function(dispatch) {
    let url = '';
    let data = {};

    if(type === KNOWLEDGE_BASE)
      url = knowledge_base_rating;
    if(type === RANDOM)
      url = random_data_rating;
    if(type === SOFT_SKILLS)
      url = softskills_data_rating;

    let num = 0;

    // setting up data object for post request
    data = { user: null, resource: id, ...rating };
    let timesRated = cookies.get(`timesRated_${path}`);
    // checking if 'timesRated' cookie is less than ratingLimit
    if(!timesRated || (timesRated && (timesRated < ratingLimit))) {
      apiCall(url, 'post', data)
      .then(results => {
        // set/update cookie only if status is '201'
        if(results.response.status === 201) {
          if(!timesRated)
            timesRated = 0;
          num = eval(timesRated) + 1;
          // set unique cookie for every course/path
          cookies.set(`timesRated_${path}`, `${num}`, { path: '/' });
        }
      })
    }
  }
}
