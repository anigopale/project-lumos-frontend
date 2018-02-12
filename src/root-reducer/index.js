import { combineReducers } from 'redux';
import resource from '../classroom/reducers/resource-reducer';
import playlist from '../classroom/reducers/playlist-reducer';

const rootReducer = combineReducers({
  resource,
  playlist
});

export default rootReducer;
