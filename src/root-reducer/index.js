import { combineReducers } from 'redux';
import domains from '../navigation/domains/reducers/domain-reducer';
import languages from '../navigation/languages/reducers/language-reducer';

const rootReducer = combineReducers({
  domains,
  languages
});

export default rootReducer;
