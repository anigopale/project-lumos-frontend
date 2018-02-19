import { combineReducers } from 'redux';
import resource from '../classroom/reducers/resource-reducer';
import wiktionaryData from '../classroom/components/wiktionary-search/reducers/wiktionary-reducer';

const rootReducer = combineReducers({
  resource,
  wiktionaryData
});

export default rootReducer;
