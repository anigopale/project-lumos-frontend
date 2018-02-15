import { combineReducers } from 'redux';
import domains from '../navigation/domains/reducers/domain-reducer';
import languages from '../navigation/languages/reducers/language-reducer';
import courses from '../navigation/courses/reducers/courses-reducer';
import softskills from '../navigation/soft-skills/reducers/softskills-reducer';

const rootReducer = combineReducers({
  domains,
  languages,
  courses,
  softskills
});

export default rootReducer;
