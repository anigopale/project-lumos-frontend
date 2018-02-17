import { combineReducers } from 'redux';
import resource from '../classroom/reducers/resource-reducer';
import playlist from '../classroom/reducers/playlist-reducer';
import activeVideo from '../classroom/reducers/active-video-reducer';

const rootReducer = combineReducers({
  resource,
  playlist,
  activeVideo
});

export default rootReducer;
