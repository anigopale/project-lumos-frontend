import { combineReducers } from 'redux';
import resource from '../classroom/reducers/resource-reducer';
import wiktionaryData from '../classroom/components/wiktionary-search/reducers/wiktionary-reducer';
import wikipediaData from '../classroom/components/wikipedia-search/reducers/wikipedia-reducer';

const rootReducer = combineReducers({
  resource,
  wiktionaryData,
  wikipediaData
});

export default rootReducer;
