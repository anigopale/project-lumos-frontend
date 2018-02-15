import { combineReducers } from 'redux';
import domains from '../scenes/domain-page/components/domains/reducers/domain-reducer';

const rootReducer = combineReducers({
  domains
});

export default rootReducer;
