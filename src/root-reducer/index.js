import { combineReducers } from 'redux';
import resource from '../classroom/reducers/resource-reducer';

const rootReducer = combineReducers({
  resource
});

export default rootReducer;
