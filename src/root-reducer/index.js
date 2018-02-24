import { combineReducers } from 'redux';
import domains from '../navigation/domains/reducers/domain-reducer';
import languages from '../navigation/languages/reducers/language-reducer';
import courses from '../navigation/courses/reducers/courses-reducer';
import softskills from '../navigation/soft-skills/reducers/softskills-reducer';
import resource from '../classroom/reducers/resource-reducer';
import wiktionaryData from '../classroom/components/wiktionary-search/reducers/wiktionary-reducer';
import wikipediaData from '../classroom/components/wikipedia-search/reducers/wikipedia-reducer';

const rootReducer = combineReducers({
  domains,
  languages,
  courses,
  softskills,
  resource,
  wiktionaryData,
  wikipediaData
});

export default rootReducer;
