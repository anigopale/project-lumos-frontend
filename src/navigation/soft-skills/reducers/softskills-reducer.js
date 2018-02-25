import _ from 'lodash';
import { ITEMS_PER_PAGE } from '../../../common-services/custom-pagination';
import { FETCH_SOFT_SKILLS } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SOFT_SKILLS:
    
      //creating chunks for custom pagination
      state = _.chunk(action.payload, ITEMS_PER_PAGE);
      return state;
      break;

  }
  return state;
}
