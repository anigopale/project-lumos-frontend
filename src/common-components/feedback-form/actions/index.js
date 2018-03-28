import { feedback_api } from '../../../common-services/api-endpoints';
import { apiCall } from '../../../common-services/api-call';

export function postFeedback(text) {
  return function(dispatch) {
    
    let data = { text, user: null };
    apiCall(feedback_api, 'post', data)
  }
}
