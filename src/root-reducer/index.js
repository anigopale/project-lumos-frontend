import { combineReducers } from 'redux';
import domains from '../navigation/domains/reducers/domain-reducer';
import languages from '../navigation/languages/reducers/language-reducer';
import courses from '../navigation/courses/reducers/courses-reducer';

const rootReducer = combineReducers({
  domains,
  languages,
  courses
});

export default rootReducer;
